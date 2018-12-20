const SimpleCryptoJS = require('simple-crypto-js').default

// example
function testSimpleCryptoJS (password = 'password') {
  let plainObj = { text: 'Hello World!' }
  const inCrypto = new SimpleCryptoJS(password)
  const outCrypto = new SimpleCryptoJS(password)

  let cypherText = inCrypto.encryptObject(plainObj)
  let decryptedObj = outCrypto.decryptObject(cypherText)
  return decryptedObj.text
}

module.exports = testSimpleCryptoJS
