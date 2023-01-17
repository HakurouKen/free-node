import * as dotenv from 'dotenv';
import { writeFile } from 'node:fs/promises';
import fetch from 'node-fetch';
import isValidHostname from 'is-valid-hostname';
import { debug, decodeBase64 } from './utils.mjs';

dotenv.config();

const publicCollections = [
  {
    name: 'freefq',
    url: 'https://raw.fastgit.org/freefq/free/master/v2',
    base64: true,
    nameFormatter(s) {
      return s.replace('github.com/freefq - ', '[freefq]');
    }
  },
  {
    name: '1808.ga',
    url: 'https://jiang.netlify.app/',
    base64: true,
    nameFormatter(s) {
      return s.replace('二爷翻墙网 https://1808.ga', '[1808.ga]').trim();
    }
  },
  {
    name: 'butnono',
    url: 'https://www.butnono.com/wp-content/uploads/2020/06/v2ray%E9%80%9A%E7%94%A8vmess%E8%8A%82%E7%82%B9.txt',
    nameFormatter(s) {
      return s.replace(/-付费推荐(?:.*)$/, '');
    }
  },
  {
    name: 'nodefree',
    get url() {
      const getDigits = (n, digit = 2) => n.toString().padStart(digit, '0');

      const t = new Date(Date.now() - 14 * 60 * 60 * 1000);
      const year = t.getFullYear();
      const month = getDigits(t.getMonth() + 1);
      const date = getDigits(t.getDate());

      return `https://nodefree.org/dy/${year}${month}/${year}${month}${date}.txt`;
    },
    base64: true,
    nameFormatter(s) {
      return `[nodefree]${s}`;
    }
  }
];

const privateCollections = [
  {
    name: 'bulink',
    url: `https://bulink.me/${process.env.BULINK_SUB_URL}`,
    base64: true
  },
  {
    name: 'getafreenode',
    url: `https://getafreenode.com/subscribe/?uuid=${process.env.GETAFREENODE_UUID}`,
    base64: true
  }
];

const formatter = {
  async vmess(line, nameFormatter) {
    let data;
    try {
      data = JSON.parse(decodeBase64(line.replace(/^vmess:\/\//, '')));
    } catch (e) {
      return null;
    }
    if (!isValidHostname(data.add)) {
      return null;
    }
    data.ps = nameFormatter(data.ps);
    return `vmess://${Buffer.from(JSON.stringify(data)).toString('base64')}`;
  },
  async trojan(line, nameFormatter) {
    const url = new URL(line);
    const hash = decodeURIComponent(url.hash).slice(1);
    url.hash = `#${encodeURIComponent(nameFormatter(hash))}`;
    return url.href;
  },
  async ss(line, nameFormatter) {
    const [u, hash] = line.split('#');
    const decodedHash = decodeURIComponent(hash);
    const formatted = nameFormatter(decodedHash);
    return `${u}#${encodeURIComponent(formatted)}`;
  }
};

async function retryFetch(url, options, retry = 0) {
  if (typeof options === 'number') {
    retry = options;
    options = undefined;
  }
  try {
    return await fetch(url, options);
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
    const { url, base64 = false } = collection;
    debug('collection: ', url);
    let response;
    try {
      response = await retryFetch(url, 3);
    } catch (e) {
      console.error(e);
      continue;
    }
    const raw = await response.text();
    const text = base64 ? Buffer.from(raw, 'base64').toString() : raw;
    const lines = text.trim().split('\n');
    for (const line of lines) {
      const protocol = line.match(/^(vmess|trojan|ss):\/\//)?.[1];
      if (formatter[protocol]) {
        debug('line:', line);
        const url = await formatter[protocol](
          line,
          collection.nameFormatter || ((s) => s)
        );
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
  const results = await fetchNodeCollections(collections);
  await writeFile(file, results.join('\n'), 'utf-8');
}

create(process.argv.slice(2).includes('--private') ? 'private' : 'public');
