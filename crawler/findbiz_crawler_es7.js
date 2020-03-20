const rp = require('request-promise')
// const fs = require('fs')
const parser = require(`${__dirname}/parser/findbiz.js`)


/*
Delay Time
*/
function delayTime(time){
    return new Promise(function(resolve){
        setTimeout(resolve, time)        
    })
}


async function findbizHTML(){
    // Crawler Setting
    let jar = rp.jar()
    let options = {
        method : 'GET',
        uri : 'https://findbiz.nat.gov.tw/fts/query/QueryCmpyDetail/queryCmpyDetail.do?objectId=SEM3MDc5Njc0OQ==&banNo=70796749',
        headers : {
            'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Accept-Encoding' : 'gzip, deflate, br',
            'Accept-Language' : 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
            'Cache-Control' : 'max-age=0',
            'Content-Type' : 'application/x-www-form-urlencoded',
            'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
            Host: 'findbiz.nat.gov.tw',
            Origin: 'https://findbiz.nat.gov.tw',
            Referer: 'https://findbiz.nat.gov.tw/fts/query/QueryCmpyDetail/queryCmpyDetail.do?objectId=SEM3MDc5Njc0OQ==&banNo=70796749'
        },
        jar : jar,
        rejectUnauthorized: false,
        insecure: true
    }
    // Main
    try {
        await delayTime(3000)
        let html = await rp(options)
        parser.findbizHTMLJson(html)

    } catch(e) {
        throw new Error(e)
    }
}