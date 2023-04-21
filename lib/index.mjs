import * as dotenv from 'dotenv';
import { writeFile } from 'node:fs/promises';
import fetch from 'node-fetch';
import isValidHostname from 'is-valid-hostname';
import { debug, decodeBase64, encodeBase64, isBase64Like } from './utils.mjs';
import { speedTest } from './speed-test.mjs';
import {
  publicCollections,
  privateCollections,
  nodeNameFormatter
} from './node-collections.js';

dotenv.config();

const DATE_REGEXP = /\$\{(YYYY|YY|MM|DD)\}/g;

function getRequestUrl(s) {
  const getDigits = (n, digit = 2) => n.toString().padStart(digit, '0');

  const t = new Date(Date.now() - 14 * 60 * 60 * 1000);
  const year = t.getFullYear();
  const month = getDigits(t.getMonth() + 1);
  const date = getDigits(t.getDate());

  return s.replace(DATE_REGEXP, (_, placeholder) => {
    if (placeholder === 'YYYY') {
      return `${year}`;
    }
    if (placeholder === 'YY') {
      return `${year}`.slice(2);
    }
    if (placeholder === 'MM') {
      return `${month}`;
    }
    if (placeholder === 'DD') {
      return `${date}`;
    }
    return '';
  });
}

const formatter = {
  vmess(line, collection) {
    let data;
    try {
      data = JSON.parse(decodeBase64(line.replace(/^vmess:\/\//, '')));
    } catch (e) {
      return null;
    }
    if (!isValidHostname(data.add)) {
      return null;
    }
    data.ps = nodeNameFormatter(data.ps, collection);
    return `vmess://${encodeBase64(JSON.stringify(data))}`;
  },
  trojan(line, collection) {
    const url = new URL(line);
    const hash = decodeURIComponent(url.hash).slice(1);
    url.hash = `#${encodeURIComponent(nodeNameFormatter(hash, collection))}`;
    return url.href;
  },
  ss(line, collection) {
    const [u, hash] = line.split('#');
    const decodedHash = decodeURIComponent(hash);
    const formatted = nodeNameFormatter(decodedHash, collection);
    return `${u}#${encodeURIComponent(formatted)}`;
  }
};

async function retryFetch(url, options, retry = 0) {
  if (typeof options === 'number') {
    retry = options;
    options = undefined;
  }
  try {
    const response = await fetch(url, options);
    return response;
  } catch (e) {
    if (retry > 0) {
      return retryFetch(url, options, retry - 1);
    }
    throw e;
  }
}

async function fetchNodeCollections(collections) {
  const results = [];
  for (const collection of collections) {
    const { url: rawUrl } = collection;
    debug('collection: ', rawUrl);
    const url = getRequestUrl(rawUrl);
    let rawText;
    try {
      const response = await retryFetch(url, 3);
      rawText = await response.text();
    } catch (e) {
      debug(e);
      continue;
    }
    const text = isBase64Like(rawText) ? decodeBase64(rawText) : rawText;
    const lines = text.trim().split('\n');
    for (const line of lines) {
      const protocol = line.match(/^(vmess|trojan|ss):\/\//)?.[1];
      // debug('line:', line);
      if (typeof formatter[protocol] === 'function') {
        const url = await formatter[protocol](line, collection);
        if (url) {
          results.push(url);
        }
      }
    }
  }
  return results;
}

async function create(collectionType = 'public') {
  const collections =
    collectionType === 'private' ? privateCollections : publicCollections;
  const file = collectionType === 'private' ? 'private' : 'public';
  const nodes = await fetchNodeCollections(collections);
  debug(
    `${collections.length} collections, ${nodes.length} nodes found, speed-test running...`
  );
  const results = await speedTest({ nodes, timeout: 3 });
  await writeFile(file, results.join('\n'), 'utf-8');
}

create(process.argv.slice(2).includes('--private') ? 'private' : 'public');
