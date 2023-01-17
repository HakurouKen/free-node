import createDebug from 'debug';

export const debug = createDebug('free-node');

export const decodeBase64 = (s) => Buffer.from(s, 'base64').toString();

export const encodeBase64 = (s) => Buffer.from(s).toString('base64');
