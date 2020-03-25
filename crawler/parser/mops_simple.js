const cheerio = require('cheerio');
const moment = require('moment');

function MopsHTMLJson(html){
    let $ = cheerio.load(html,{
        decodeEntities:false
    })

    let cmpyContent = {}
    let dom_tabCmpyContent = $('div#company')
    if(undefined == dom_tabCmpyContent) throw new Error('NO DATA!')
    let cmpyName = ($('div#company div').eq(0).text().replace(/公司名稱：/,'')).trim()
    let cmpyID = ($('div#company div').eq(1).text().replace(/公司代號：/,'')).trim()
    let cmpyType = ($('div#company div').eq(2).text().replace(/產業類別：/,'')).trim()

    cmpyContent['name'] = cmpyName
    cmpyContent['id'] = cmpyID
    cmpyContent['type'] = cmpyType

    // 公司基本資訊
    let info = {}
    let cmpyInfoRows = $('#company > table:nth-child(11) tr:nth-child(odd) td')
    for (let i = 0; i < cmpyInfoRows.length; i++){
        let colName = ($(cmpyInfoRows).eq(i).text()).trim()
        let colData = ($('#company > table:nth-child(11) tr:nth-child(even) td').eq(i).text()).trim()

        switch(true){
            case /董事長/.test(colName):
                info['ceo'] = colData
                break
            
            case /總經理/.test(colName):
                info['manager'] = colData
                break

            case /發言人/.test(colName):
                info['spokenman'] = colData
                break

            case /聯絡電話/.test(colName):
                info['phone'] = colData
                break
            
            case /公司網址/.test(colName):
                info['website'] = colData
                    break

            case /公司地址/.test(colName):
                info['address'] = colData
                break

            case /主要經營業務/.test(colName):
                info['business'] = colData
                break

            case /實收資本額/.test(colName):
                colData = parseInt(colData.replace(/,/g,''))
                if(isNaN(colData)){
                    info['asset'] = -1
                }else{
                    info['asset'] = colData
                }
                break
            }
    }
    cmpyContent.info =info

    // 公司近期發布之重大訊息
    let newsInfo=[]
    let cmpyNewsRows = $('#company > table:nth-child(14) tbody tr')
    for(let i = 1; i<cmpyNewsRows.length;i++){
        let colName = parseInt(($(cmpyNewsRows).find('td:nth-child(odd)').eq(i).text().replace(/\//g,'')).trim()) + 19110000
        colName = moment(colName, 'YYYYMMDD').format('YYYY-MM-DD')
        let colData = ($(cmpyNewsRows).find('td:nth-child(even)').eq(i).text()).replace(/[\n\t]/g,'').trim()
        newsInfo.push({
            date:colName,
            newsInfo:colData,
        })
    }
    cmpyContent.news = newsInfo
    return cmpyContent
}
module.exports = {MopsHTMLJson}