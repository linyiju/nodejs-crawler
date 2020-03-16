var rp = require('request-promise')
const fs = require('fs')
const moment = require('moment')
const parser = require(`${__dirname}/parser/udn.js`)

// Generate udn url list
function udn_url_list(page){
    let url_list = [];
    for(i=0; i<=page; i++){
        let accurate_url = `https://udn.com/news/breaknews/1/${i}`;
        url_list.push({
            page:i,
            url:accurate_url});
    };

    return url_list;
};

async function udn_crawler(url_list){
    for(let element of url_list){
        let options = {
            uri:element.url,
            headers:{
                'Accept':'text/html',
                'Accept-charset':'utf8',
                'Catch-Control' : 'max-page=0',
                'Connection':'keep-alive',
                'Accept-Language':'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
                'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
            }
        }

        let start = moment().format('HH:mm:ss.SSS')
        let body = await rp(options)
        let infos = parser.mainPrase(body)
        fs.writeFileSync(`${__dirname}/data/udn_es7_${element.page}.json`, JSON.stringify(infos, null, 4))
        console.log(`${element.page} | ${start} | ${moment().format('HH:mm:ss.SSS')}`)
    }
}

udn_crawler(udn_url_list(12))