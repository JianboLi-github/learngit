const crypto = require('crypto')

const hash = crypto.createHash('md5')

hash.update('Hello, world!')
hash.update('Hello, nodejs!')
console.log(hash.digest('hex'))

// 封装AES 加密函数
function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key)
    // const cipher = crypto.createCipheriv('aes192', key, iv)
    // createCipher方法废弃了
    var crypted = cipher.update(data, 'utf-8', 'hex')
    crypted += cipher.final('hex')

    return crypted 
}

// 封装AES 解密函数
function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key)
    var decryped = decipher.update(encryped, 'hex','utf-8')
    decryped += decipher.final('utf-8')
    
    return  decryped
}

var data = 'hello , this is a secret message!'
var key = 'password'
var encryped = aesEncrypt(data, key)
var decryped = aesDecrypt(encryped, key)

console.log('Plain text:' + data)
console.log('Encryped text:' + encryped)
console.log('Decryped text:' + decryped)

/*\
 *
 *
 *
 *
\*/
console.log('*-*-*-*-*-*-*-*-*-')

// Diffie-Hellman

//xiaoming's keys:
var ming = crypto.createDiffieHellman(512)
var ming_keys = ming.generateKeys()

var prime = ming.getPrime()
var generator = ming.getGenerator()

console.log('Prime:' + prime.toString('hex'))
console.log('Generator:' + generator.toString('hex'))

//xiaohong's keys:
var hong = crypto.createDiffieHellman(prime, generator)
var hong_keys = hong.generateKeys()

// exchange and generate secret
var ming_secret = ming.computeSecret(hong_keys)
var hong_secret = hong.computeSecret(ming_keys)

console.log('Secret of Xiaoming:'+ ming_secret.toString('hex'))
console.log('secrete of Xiaohong:' + hong_secret.toString('hex'))
console.log('end')

// rsa加密

const fs = require('fs')

// 从文件中加载key
function loadKey(file) {
    // key 实际上就是PEM编码的字符串
    return fs.readFileSync(file, 'utf-8')
}

let 
    prvKey = loadKey('./rsa-prv.pem'),
    pubKey = loadKey('./rsa-pub.pem'),
    message = 'Hello, world!'

// 使用私钥加密，公钥解密
let encode_by_prv = crypto.privateEncrypt(prvKey, Buffer.from(message, 'utf-8'))
console.log('encrypted by private key:' + encode_by_prv.toString('hex'))

let decode_by_pub = crypto.publicDecrypt(pubKey, encode_by_prv)
console.log('decrypted by public key:' + decode_by_pub.toString('utf-8'))

// 使用公钥加密，私钥解密
let encode_by_pub = crypto.publicEncrypt(pubKey, Buffer.from(message, 'utf-8'))
console.log('Encrypted by public key:' + encode_by_pub.toString('hex'))

let decode_by_prv = crypto.privateDecrypt(prvKey, encode_by_pub)
console.log('Decrypted by private key:' + decode_by_prv.toString('utf-8'))