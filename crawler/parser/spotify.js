const cheerio = require('cheerio');
const moment = require('moment');

function mainPrase(html){
    let $ = cheerio.load(html)
    let infos = []
    $('div.wrapper table.chart-table tbody tr').each(function (index, element){
        let info={}
        info.song_name = $(element).find('td.chart-table-track strong').text()
        info.musician = $(element).find('td.chart-table-track span').text()
        info.stream = $(element).find('td.chart-table-streams').text().replace(/,/g, '')
        info.url = $(element).find('td.chart-table-image a').attr('href')
        info.date = moment($('div.responsive-select  div.responsive-select-value').text().replace(/Globaldaily/,''), 'MM/DD/YYYY').format('YYYY-MM-DD')
        infos.push(info)
    })
    return infos;

}

module.exports = {mainPrase};