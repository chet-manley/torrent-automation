#!/bin/env node
'use strict'

// import libraries
const {google} = require('googleapis')
const path = require('path')
//const fs = require('fs')

// local config
const KEYFILE = 'jwt-keys.json'
const SCOPES = ['https://www.googleapis.com/auth/drive']

async function getClient (keyfile) {
  // create a JWT auth client
  const client = await google.auth.getClient({
    'keyFile': path.join(__dirname, keyfile),
    'scopes': SCOPES,
  })

  // obtain a drive client
  const drive = google.drive({
    'version': 'v3',
    'auth': client,
  })

  return drive
}

// Google Drive class
class GDrive {
  constructor (options) {
    const keyfile = options.keyfile

    this.drive = getClient(keyfile)
      .catch(console.error)
  }

  async upload () {
    // request file list
    const res = await this.drive.files.list({
      'corpora': 'user',
      'orderBy': 'name',
      'pageSize': 20,
      'q': '',
      'spaces': 'drive',
      'fields': 'files(id, name),nextPageToken',
    })
    res.data.status = res.status
    return res.data
  }

  get list () {
    return (async () => {
      console.log(this.drive)
      this.drive = await this.drive
      // request file list
      const res = await this.drive.files.list({
        'corpora': 'user',
        'orderBy': 'name',
        'pageSize': 10,
        'pageToken': '',
        'spaces': 'drive',
        'fields': 'files(id, name),nextPageToken',
      })
      // console.log(res.status)
      res.data.status = res.status
      return res.data
    })(this.drive)
  }
}

function runTest () {
  const drive = new GDrive({'keyfile': KEYFILE})
  //return drive.files
  return drive.list
}

if (module === require.main) {
  runTest()
    .then(data => {
      console.log(data)
    })
    .catch(console.error)
}

module.exports = {runTest}
