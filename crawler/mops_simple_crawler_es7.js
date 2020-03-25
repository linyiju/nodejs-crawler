const rp = require('request-promise')
const fs = require('fs')
const parser = require(`${__dirname}/parser/mops_simple.js`)

let cod_ids = [2885, 2371, 2012, 4551, 2904, 3011, 4433, 2207]
// let cod_ids = [2885]

async function mops_crawler(co_id){
    let company_infos = []
    for (co_id of cod_ids){
        // Crawler Setting
        let options = {
            method : 'POST',
            uri : 'https://mops.twse.com.tw/mops/web/ajax_t146sb05',
            headers : {
                'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'Accept-Encoding' : 'gzip, deflate, br',
                'Accept-Language' : 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
                'Cache-Control' : 'max-age=0',
                'Content-Type' : 'application/x-www-form-urlencoded',
                'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
            },
            form : {
                encodeURIComponent: 1,
                step: 1,
                firstin: 1,
                off: 1,
                'ueryName' : 'co_id',
                'inpuType' : 'co_id',
                'co_id' : co_id,
                'encodeURIComponent' : 1,
                'TYPEK' : 'all',
            },
        }
        // Main
        let body = await rp(options)
        let infos = parser.MopsHTMLJson(body)
        company_infos.push(infos)
    }
    fs.writeFileSync(`${__dirname}/data/mops_simple_es7.json`, JSON.stringify(company_infos, null, 4))
}

mops_crawler(cod_ids)