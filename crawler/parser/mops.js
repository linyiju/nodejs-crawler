const cheerio = require('cheerio');

function mainPrase(html){
    let $ = cheerio.load(html,{
        decodeEntities:false
    })
    let info = {}
    info.company = $('.noBorder tbody td.compName b span').text().split('\n')[1]
    info.data = {
        id : $('td.lColor').slice(0).eq(0).text(),
        type : $('td.lColor').slice(1).eq(0).text().trim(),
        country : $('td.lColor').slice(2).eq(0).text().trim(),
        name : $('td.lColor').slice(3).eq(0).text().trim(),
        phone : $('td.lColor').slice(4).eq(0).text().trim(),
        address : $('td.lColor').slice(5).eq(0).text().trim(),
        ceo : $('td.lColor').slice(6).eq(0).text().trim(),
        manager : $('td.lColor').slice(7).eq(0).text().trim(),
    }
    
    return info
}

module.exports = {mainPrase};