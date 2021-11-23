"use strict"
const randomstring = require('randomstring');
class Encryption{

    static encrypt(string){
        return encodeURIComponent(Buffer.from(Buffer.from(string.toString()).toString('base64')).toString('hex'))
    }
    static decrypt(string){
        return Buffer.from(Buffer.from(decodeURIComponent(string.toString()), 'hex').toString(), 'base64').toString()
    }
    static generate(is_reference) {
        return new Promise(async (resolve, reject) => {
            let reference = randomstring.generate(30);

            let _reference = `${is_reference ? 'reference' : 'reference'}${reference}`;
            resolve(_reference)

        });
    }
}

module.exports = Encryption;