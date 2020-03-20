const cheerio = require('cheerio');
const moment = require('moment');


function findbizHTMLJson(html){
    let $ = cheerio.load(html,{
        decodeEntities:false
    })

    let cmpyContent = {}
    let dom_tabCmpyContent = $('div.content div#tabCmpyContent')
    if(undefined == dom_tabCmpyContent) throw new Error('NO DATA!')
    let cmpyType = ($('div#tabCmpyContent h3').eq(0).text() || '')
    .replace(/[  \t]/g, '')
    .trim()

    let cmpyRows = $('div.table-responsive table tbody tr')
    cmpyContent['公司類型'] = cmpyType
    for (let i = 0; i < cmpyRows.length; i++){
        let cmpyRow = $(cmpyRows).eq(i)
        let colName = ($(cmpyRow).find('td').eq(0).text() || '').trim()
        let colData = ($(cmpyRow).find('td').eq(1).text() || '').trim()

        switch(true){
            case /統一編號/.test(colName):
                colData = colData.replace(/訂閱/,'').replace(/[\n\t]/g, '').trim()
                cmpyContent['統一編號'] = colData
                break
            
            case /公司狀況/.test(colName):
                let colDataAll = colData.replace(/[\n\t]/g, '').replace(/ 「查詢.+/g, "")
                cmpyContent['公司狀況'] = colDataAll
                break

            case /章程所訂外文公司名稱/.test(colName):
                colData = colData.replace(/[ \n\t]/g, '').trim()
                cmpyContent['章程所訂外文公司名稱'] = colData
                break

            case /資本總額/.test(colName):
                cmpyContent['資本總額'] = colData
                break
            
            case /實收資本額/.test(colName):
                cmpyContent['實收資本額'] = colData
                break
            
            case /代表人姓名/.test(colName):
                cmpyContent['代表人姓名'] = colData
                break

            case /公司所在地/.test(colName):
                colData = colData.replace(/電子地圖/g, '').replace(/[ \n\t]/g, '')
                cmpyContent['公司所在地'] = colData
                break
        }

    }
    // console.log(cmpyContent)
    return cmpyContent
}
module.exports = {findbizHTMLJson}