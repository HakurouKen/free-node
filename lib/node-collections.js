export const publicCollections = [
  {
    name: 'freefq',
    homepage: 'https://github.com/freefq/free',
    url: 'https://raw.fastgit.org/freefq/free/master/v2',
    base64: true,
    nameFormatter(s) {
      return s.replace('github.com/freefq - ', '');
    }
  },
  {
    name: '1808.ga',
    homepage: 'https://1808.ga/',
    url: 'https://jiang.netlify.app/',
    base64: true,
    nameFormatter(s) {
      return s.replace('二爷翻墙网 https://1808.ga', '').trim();
    }
  },
  {
    name: 'butnono',
    homepage: 'https://www.butnono.com/daily-vmess.html',
    url: 'https://www.butnono.com/wp-content/uploads/2020/06/v2ray%E9%80%9A%E7%94%A8vmess%E8%8A%82%E7%82%B9.txt',
    nameFormatter(s) {
      return s.replace(/-付费推荐(?:.*)$/, '');
    }
  },
  {
    name: 'NodeFree',
    homepage: 'https://nodefree.org/',
    url: 'https://nodefree.org/dy/${YYYY}/${MM}/${YYYY}${MM}${DD}.txt',
    base64: true
  },
  {
    name: 'pojiezhiyuanjun/freev2',
    homepage: 'https://github.com/pojiezhiyuanjun/freev2',
    url: 'https://raw.fastgit.org/pojiezhiyuanjun/freev2/master/${MM}${DD}.txt',
    base64: true
  },
  {
    name: 'xiyaowong/freeFQ',
    homepage: 'https://github.com/xiyaowong/freeFQ',
    url: 'https://raw.fastgit.org/xiyaowong/freeFQ/main/v2ray',
    base64: true
  },
  {
    name: 'ClashNode',
    homepage: 'https://clashnode.com/f/freenode',
    url: 'https://clashnode.com/wp-content/uploads/${YYYY}/${MM}/${YYYY}${MM}${DD}.txt',
    base64: true
  },
  {
    name: 'kxswa/k',
    homepage: 'https://github.com/kxswa/k',
    url: 'https://raw.fastgit.org/kxswa/k/k/base64',
    base64: true
  },
  {
    name: 'vpei/Free-Node-Merge',
    homepage: 'https://github.com/vpei/Free-Node-Merge/',
    url: 'https://raw.fastgit.org/vpei/Free-Node-Merge/main/o/node.txt',
    base64: true
  },
  {
    name: 'Jsnzkpg',
    homepage: 'https://github.com/Jsnzkpg/Jsnzkpg',
    url: 'https://raw.fastgit.org/Jsnzkpg/Jsnzkpg/Jsnzkpg/Jsnzkpg',
    base64: true
  },
  {
    name: 'peasoft/NoMoreWalls',
    homepage: 'https://github.com/peasoft/NoMoreWalls',
    url: 'https://raw.fastgit.org/peasoft/NoMoreWalls/master/list.txt',
    base64: true
  },
  {
    name: 'mianfeifq/share',
    homepage: 'https://github.com/mianfeifq/share',
    url: 'https://raw.fastgit.org/mianfeifq/share/main/data2023016.txt',
    base64: true
  },
  {
    name: 'Rawdroid/Free-servers',
    homepage: 'https://github.com/Pawdroid/Free-servers',
    url: 'https://raw.fastgit.org/Pawdroid/Free-servers/main/sub',
    base64: true
  },
  {
    name: 'aiboboxx/v2rayfree',
    homepage: 'https://github.com/aiboboxx/v2rayfree',
    url: 'https://raw.fastgit.org/aiboboxx/v2rayfree/main/v2',
    base64: true
  },
  {
    name: 'adiwzx/freenode',
    homepage: 'https://github.com/adiwzx/freenode',
    url: 'https://raw.githubusercontent.com/adiwzx/freenode/main/adispeed.txt',
    base64: true
  },
  {
    name: 'ermaozi/get_subscribe',
    homepage: 'https://github.com/ermaozi/get_subscribe',
    url: 'https://raw.fastgit.org/ermaozi/get_subscribe/main/subscribe/v2ray.txt',
    base64: true
  },
  {
    name: 'xrayfree',
    homepage: 'https://github.com/xrayfree/free-ssr-ss-v2ray-vpn-clash',
    url: 'https://freefq.neocities.org/free.txt',
    base64: true
  }
];

export const privateCollections = [
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
