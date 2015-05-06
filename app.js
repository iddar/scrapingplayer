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
  let soundsUrl = list2array(list)

  // request(soundsUrl[0], function(err, res, html){
  //   console.log(html)
  // })

  async.eachSeries(soundsUrl, play, function(err) {
    console.log(":( Ya no hay rolas...")
  })


  //.pipe(fs.createWriteStream( path.join(tmpDir, 'rola1.mp3') ) )
  //async.map(soundsUrl, link2mp3, callback)

}

function list2array(list){
  // create array urlSound
  let sounds = new Array()
  _.forEach(list , function getArray(item){
    sounds.push(item.attribs.href)
  })
  return sounds
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
      //
      // self.speaker = {};
      // self.speaker.readableStream = this;
      // self.speaker.Speaker = speaker;
      //self.emit('playing', song);


      //show(song);

      // This is where the song acturaly played end,
      // can't trigger playend event here cause
      // unpipe will fire this speaker's close event.
      this.pipe(speaker).once('close', function() {
        console.log("Se acabo la rola")
      });
    }

    function onFinished() {
      console.log("Fin...")
      callback(null, "Fin...")
    }

}
//
// function show(song) {
//   var name = song['src'].split('/').pop();
//   var total = 70;
//   var parser = mm(fs.createReadStream(name), {
//     duration: true
//   }, function(err, metadata) {
//     if (err) {
//       console.log('Now playing: ' + name + ' (No metadata found)');
//       return;
//     }
//     var info = metadata.title;
//     var duration = parseInt(metadata.duration);
//     var dots = total - 1;
//     var speed = (duration * 1000) / total;
//     console.log(info)
//   });
// }
