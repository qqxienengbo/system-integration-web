// crypto-utils.js

import CryptoJS from 'crypto-js';

// const secretKey='abcdefg123456789'
/**
 * AES 加密
 * @param {string} data - 要加密的数据
 * @param {string} secretKey - 密钥
 * @returns {string} 
 */
export function encryptAES(data,secretKey) {
  if (!data || !secretKey) {
    throw new Error('Data and secret key are required for encryption.');
  }
  const key = CryptoJS.enc.Utf8.parse(secretKey);
  const encrypted = CryptoJS.AES.encrypt(data, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}

/**
 * AES 解密
 * @param {string} encryptedData - 加密后的数据
 * @param {secretKey} secretKey - 密钥
 * @returns {string} 解密后的字符串
 */
export function decryptAES(encryptedData,secretKey) {
  if (!encryptedData || !secretKey) {
    throw new Error('Encrypted data and secret key are required for decryption.');
  }
//   字符串形式的密钥转换成了 WordArray 类型
const key = CryptoJS.enc.Utf8.parse(secretKey);
  const bytes = CryptoJS.AES.decrypt(encryptedData, key, {
    mode: CryptoJS.mode.ECB,//加密模式位ECB，需要与后端一致
    padding: CryptoJS.pad.Pkcs7//填充方式位pkcs7padding，后端为pkcs5padding(两者等同)
  });
  return bytes.toString(CryptoJS.enc.Utf8);
}