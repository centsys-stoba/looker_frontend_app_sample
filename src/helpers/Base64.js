// https://gist.github.com/jhurliman/1250118

import { Buffer } from 'buffer'

const encode = (unencoded) => {
  return new Buffer(unencoded || '').toString('base64');
}
const decode = (encoded) => {
  return new Buffer(encoded || '', 'base64').toString('utf8');
}
export const urlEncode = (unencoded) => {
  var encoded = encode(unencoded);
  return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
export const urlDecode = (encoded) => {
  encoded = encoded.replace(/-/g, '+').replace(/_/g, '/');
  while (encoded.length % 4)
    encoded += '=';
  return decode(encoded);
}
