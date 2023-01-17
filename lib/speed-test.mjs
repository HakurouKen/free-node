import os from 'node:os';
import { mkdirSync, existsSync } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import url from 'node:url';
import { execSync } from 'node:child_process';
import { debug, encodeBase64 } from './utils.mjs';

function findLiteSpeedTestPath() {
  const platform = os.platform();
  const base = path.resolve(
    url.fileURLToPath(new URL('.', import.meta.url)),
    'bin'
  );
  if (platform === 'win32') {
    return path.join(base, 'lite-windows-amd64.exe');
  } else if (platform === 'darwin') {
    return path.join(base, 'lite-darwin-amd64');
  } else if (platform === 'posix') {
    return path.join(base, 'lite-linux-amd64');
  }
  throw new Error(`Unsupported system type: ${platform}`);
}

/**
 * 节点测速
 * @param {object} options 配置
 * @param {string} [options.workspace] 临时测试路径
 * @param {string[]} [options.nodes=[]] 需要测试的节点集合
 * @param {number} [options.concurrency=16] 并发测试数量
 * @param {number} [options.timeout=5] 超时时间(秒)
 */
export async function speedTest(options = {}) {
  const {
    workspace = path.resolve('./temp'),
    nodes = [],
    concurrency = 16,
    timeout = 5
  } = options || {};

  if (!existsSync(workspace)) {
    mkdirSync(workspace, { recursive: true });
  }

  const testSubscriptionFile = path.join(workspace, 'test-nodes');
  const testConfigFile = path.join(workspace, 'config.json');

  const testConfig = {
    group: 'TestProxies',
    speedtestMode: 'all',
    pingMethod: 'googleping',
    sortMethod: 'rspeed',
    testMode: 2,
    language: 'en',
    fontSize: 24,
    theme: 'rainbow',
    generatePicMode: 0,
    outputRange: 1000,
    generatePicMode: 3,

    subscription: testSubscriptionFile,
    concurrency,
    timeout
  };

  await Promise.all([
    // 生成临时测试配置
    fs.writeFile(testSubscriptionFile, encodeBase64(nodes.join('\n'))),
    // 生成临时配置文件
    fs.writeFile(testConfigFile, JSON.stringify(testConfig))
  ]);

  const liteSpeedTest = findLiteSpeedTestPath();
  try {
    const cmd = `${liteSpeedTest} --config=${testConfigFile} --test ${testSubscriptionFile}`;
    debug(`exec command: ${cmd}`);
    execSync(cmd, { cwd: workspace, stdio: 'pipe' });
  } catch (e) {
    debug('Unexpected Error:', e);
  }

  const testResultOutput = await fs.readFile(
    path.join(workspace, 'out.json'),
    'utf-8'
  );

  const validNodes = JSON.parse(testResultOutput).nodes.filter(
    (node) => node.isok
  );

  return validNodes.map((node) => node.link);
}
