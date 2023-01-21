import createDebug from 'debug';

export const debug = createDebug('free-node');

const base64TestRegExp =
  /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/;

export const isBase64Like = (s) => base64TestRegExp.test(s.trim());

export const decodeBase64 = (s) => Buffer.from(s, 'base64').toString();

export const encodeBase64 = (s) => Buffer.from(s).toString('base64');
