#!/usr/bin/env node

const Client = require('cabal-client')
const KEY = process.env.KEY
const NICK = process.env.NICK
const fs = require('fs')
const path = require('path')
const startedAt = new Date()
const UserMessage = require('./lib/user_message')

var plugins = []
fs.readdirSync(path.join(__dirname, "plugins")).forEach((file) => {
  var Plugin = require("./plugins/" + file)
  var plugin = new Plugin()
  plugins.push(plugin)
})

var client = new Client({ config: { dbdir: '/tmp/cabals' } })
client.addCabal(KEY).then(setup)

function setup(cabalDetails) {
  console.log("-- cabal setup --");
  // https://github.com/cabal-club/cabal-client/blob/2e6ae5f/api.md#new-message
  cabalDetails.on('new-message', ({channel, author, message}) => {
    var userMsg = new UserMessage({ channel, author, message, cabalDetails })
    var ts = new Date(message.value.timestamp)
    if (ts < startedAt) return; // historical msgs can load on connection?
    plugins.forEach((plugin) => plugin.newMessage && plugin.newMessage(userMsg))
  })

  var me = cabalDetails.getLocalName();
  console.log(` -- connected as ${me}`);
  // ensure nick is set correctly in case you changed it.
  if (process.env.NICK && me !== process.env.NICK) {
    cabalDetails.publishNick(process.env.NICK)
    console.log(` -- updating name to ${process.env.NICK}`);
  }
}
