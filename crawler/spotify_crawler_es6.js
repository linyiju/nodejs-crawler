const moment = require('moment')
const rp = require('request-promise')
const fs = require('fs')
const parser = require(`${__dirname}/parser/spotify.js`)

const spotify_regions = ['global', 'us', 'tw']
function spotify_url_list(regions) {
    let url_list = [];
    for (region of regions) {
        let accurate_url = `https://spotifycharts.com/regional/${region}/daily/latest`;
        url_list.push({
            country: region,
            url: accurate_url
        });
    };
    return url_list;
}

function spotify(url_list){
    for (let element of url_list){
        let options = {
            uri:element.url,
            headers:{
                'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'Accept-charset':'utf8',
                'Catch-Control' : 'max-page=0',
                'Connection':'keep-alive',
                'Accept-Language':'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
                'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
            }
        }

        let start = moment().format('HH:mm:ss.SSS')
        
        rp(options)
        .then(function(body){
            let infos = parser.mainPrase(body)
            fs.writeFileSync(`${__dirname}/spotify_data/spotify_${element.country}.json`, JSON.stringify(infos, null, 4))
            console.log(`${element.country} | ${start} | ${moment().format('HH:mm:ss.SSS')}`)
        })
        .catch(function(err){
            console.log(err)
        })
    }
}

spotify(spotify_url_list(spotify_regions))

