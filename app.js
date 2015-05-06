/*jshint node:true */
"use strict"

const request = require('request')
const cheerio = require('cheerio')
const _ = require('lodash')

const url = "http://grooveshark.io/search/acdc"

request
  .get(url)
  .on('error', console.log)
  .pipe(exec)

function exec(html){

  let $ = cheerio.load(html)
  let list = $(".search-results-content>div>div")
  let pages = cheerio('li', _.last(list)).length - 4 // clean items no required
  list = _.dropRight(list)


  console.log(list.length)
}


//dl>dt>a
