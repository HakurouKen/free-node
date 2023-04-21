const isFalsy = (s) => ['0', 'false', 'null'].includes(s) || !s;

// 在 github-action 中，使用原始链接，否则使用 fastgit 镜像
const useFastGitMirror = isFalsy(process.env.GITHUB_ACTION);

function getGithubRawContentUrl(url) {
  return useFastGitMirror
    ? url.replace(
        /^https:\/\/raw\.githubusercontent\.com\//,
        'https://raw.fastgit.org/'
      )
    : url;
}

export const publicCollections = [
  {
    name: 'freefq',
    homepage: 'https://github.com/freefq/free',
    url: getGithubRawContentUrl(
      'https://raw.githubusercontent.com/freefq/free/master/v2'
    )
  },
  {
    name: '1808.ga',
    homepage: 'https://1808.ga/',
    url: 'https://jiang.netlify.app/'
  },
  {
    name: 'butnono',
    homepage: 'https://www.butnono.com/daily-vmess.html',
    url: 'https://www.butnono.com/wp-content/uploads/2020/06/v2ray%E9%80%9A%E7%94%A8vmess%E8%8A%82%E7%82%B9.txt'
  },
  {
    name: 'NodeFree',
    homepage: 'https://nodefree.org/',
    url: 'https://nodefree.org/dy/${YYYY}/${MM}/${YYYY}${MM}${DD}.txt'
  },
  {
    name: 'pojiezhiyuanjun/freev2',
    homepage: 'https://github.com/pojiezhiyuanjun/freev2',
    url: getGithubRawContentUrl(
      'https://raw.githubusercontent.com/pojiezhiyuanjun/freev2/master/${MM}${DD}.txt'
    )
  },
  {
    name: 'xiyaowong/freeFQ',
    homepage: 'https://github.com/xiyaowong/freeFQ',
    url: getGithubRawContentUrl(
      'https://raw.githubusercontent.com/xiyaowong/freeFQ/main/v2ray'
    )
  },
  {
    name: 'ClashNode',
    homepage: 'https://clashnode.com/f/freenode',
    url: 'https://clashnode.com/wp-content/uploads/${YYYY}/${MM}/${YYYY}${MM}${DD}.txt'
  },
  {
    name: 'kxswa/k',
    homepage: 'https://github.com/kxswa/k',
    url: getGithubRawContentUrl(
      'https://raw.githubusercontent.com/kxswa/k/k/base64'
    )
  },
  {
    name: 'vpei/Free-Node-Merge',
    homepage: 'https://github.com/vpei/Free-Node-Merge/',
    url: getGithubRawContentUrl(
      'https://raw.githubusercontent.com/vpei/Free-Node-Merge/main/o/node.txt'
    )
  },
  {
    name: 'Jsnzkpg',
    homepage: 'https://github.com/Jsnzkpg/Jsnzkpg',
    url: getGithubRawContentUrl(
      'https://raw.githubusercontent.com/Jsnzkpg/Jsnzkpg/Jsnzkpg/Jsnzkpg'
    )
  },
  {
    name: 'peasoft/NoMoreWalls',
    homepage: 'https://github.com/peasoft/NoMoreWalls',
    url: getGithubRawContentUrl(
      'https://raw.githubusercontent.com/peasoft/NoMoreWalls/master/list.txt'
    )
  },
  {
    name: 'mianfeifq/share',
    homepage: 'https://github.com/mianfeifq/share',
    url: getGithubRawContentUrl(
      'https://raw.githubusercontent.com/mianfeifq/share/main/data2023016.txt'
    )
  },
  {
    name: 'Rawdroid/Free-servers',
    homepage: 'https://github.com/Pawdroid/Free-servers',
    url: getGithubRawContentUrl(
      'https://raw.githubusercontent.com/Pawdroid/Free-servers/main/sub'
    )
  },
  {
    name: 'aiboboxx/v2rayfree',
    homepage: 'https://github.com/aiboboxx/v2rayfree',
    url: getGithubRawContentUrl(
      'https://raw.githubusercontent.com/aiboboxx/v2rayfree/main/v2'
    )
  },
  {
    name: 'adiwzx/freenode',
    homepage: 'https://github.com/adiwzx/freenode',
    url: getGithubRawContentUrl(
      'https://raw.githubusercontent.com/adiwzx/freenode/main/adispeed.txt'
    )
  },
  {
    name: 'ermaozi/get_subscribe',
    homepage: 'https://github.com/ermaozi/get_subscribe',
    url: getGithubRawContentUrl(
      'https://raw.githubusercontent.com/ermaozi/get_subscribe/main/subscribe/v2ray.txt'
    )
  },
  {
    name: 'xrayfree',
    homepage: 'https://github.com/xrayfree/free-ssr-ss-v2ray-vpn-clash',
    url: 'https://freefq.neocities.org/free.txt'
  }
];

export const privateCollections = [
  {
    name: 'bulink',
    url: `https://bulink.me/${process.env.BULINK_SUB_URL}`
  },
  {
    name: 'getafreenode',
    url: `https://getafreenode.com/subscribe/?uuid=${process.env.GETAFREENODE_UUID}`
  }
];

export const nodeNameFormatter = (raw = '', collection = {}) => {
  const replacements = [
    ['github.com/freefq - ', ''],
    ['二爷翻墙网 https://1808.ga', ''],
    [/-付费推荐(?:.*)$/, ''],
    ['(油管:破解资源君)', ''],
    ['(TG频道@kxswa)', ''],
    ['_油管：全网最强白嫖', ''],
    ['_来源：kkzui.com', ''],
    ['(TG频道@kxswa)', ''],
    ['(youtube阿伟科技)', ''],
    ['v2rayfree.eu.org - ', ''],
    [/^adi\|/, ''],
    [/【付费推荐：(.*?)】/, '']
  ];

  let name = raw;

  for (const [searchValue, replaceValue] of replacements) {
    name = name.replace(searchValue, replaceValue);
  }

  if (!collection?.name) {
    return name.trim();
  }

  return `[${collection.name}]${name.trim()}`;
};
