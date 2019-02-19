const path = require('path')
const PouchDB = require('pouchdb')
const PouchWebSql = require('pouchdb-adapter-node-websql')
const SecurePouch = require('../src/index') // aka 'polyonic-secure-pouch'

// use sqlite for simplicity
const dbPath = path.join(__dirname, '/.pouchdb')
PouchDB.plugin(PouchWebSql)
PouchDB.plugin(SecurePouch)

const localPath = dbPath + '/sync-remote.db'
const remoteURL = 'http://127.0.0.1:5984'

const local = PouchDB(localPath, {adapter: 'websql'})
const remote = PouchDB(remoteURL)

remote.encrypt('password')

// comment out to encrypt only the remote
// local.encrypt('password')

PouchDB.sync(local, remote, {live: true, retry: true})
  .on('complete', info => console.log({output: info, message: 'complete'}))
  .on('error', err => console.error(Error({output: err, message: 'error'})))
  .on('denied', err => console.error(Error({output: err, message: 'denied'})))
