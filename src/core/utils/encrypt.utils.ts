import * as crypto from 'crypto-js';

export default class EncryptData {
  constructor(private key: string) {
    this.key = key;
    this.encrypt = this.encrypt.bind(this);
    this.decrypt = this.decrypt.bind(this);
  }

  encrypt(data: any) {
    return crypto.AES.encrypt(data, this.key).toString();
  }

  decrypt(data: any) {
    const w = crypto.AES.decrypt(data, this.key);
    return w.toString(crypto.enc.Utf8);
  }
}
