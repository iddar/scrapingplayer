/*jshint node:true */
"use strict"

const os = require('os')
const async = require('async')
const cheerio = require('cheerio')
const fs = require('fs')
//const Player = require("player")
const mm = require('musicmetadata')
const path = require('path')
const request = require('request')
const _ = require('lodash')
const lame = require('lame');
const Speaker = require('speaker');

const URL = "http://grooveshark.io/search/acdc"

request(URL, exec)

function exec(error, response, html){
  if(error) return console.log(error)

  let tmpDir = os.tmpDir()
  let $ = cheerio.load(html)
  let pages = $('.pagination>li').length - 4 // clean items no required
  let list =  $('.download-icon') // get sound box
  let songsUrl = list2array(list)

  async.eachSeries(songsUrl, play, function(err) {
    console.log(":( Ya no hay rolas...")
  })
}

function list2array(list){
  // create array urlSound
  let songs = new Array()
  _.forEach(list , function getArray(item){
    songs.push(item.attribs.href)
  })
  return songs
}

function callback(err, result){
  console.log("result")
}

function play(sound, callback){
  console.log(sound)
  request(sound)
    .pipe(new lame.Decoder())
    .once('format', onPlaying)
    .once('finish', onFinished)


    function onPlaying(f) {
      var speaker = new Speaker(f);
      this.pipe(speaker).once('close', function() {
        console.log("Se acabo la rola")
      });
    }

    function onFinished() {
      console.log("Fin...")
      callback(null, "Fin...")
    }

}
