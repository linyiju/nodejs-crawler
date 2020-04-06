const cheerio = require('cheerio');
const moment = require('moment');


function mainPrase(html){
    let $ = cheerio.load(html,{
        decodeEntities:false
    })
    let info = []
    let dom_compContent = $('#table01 > center > form > table.hasBorder')
    if (undefined == dom_compContent) throw new Error('No Data!')
    
    let rows = $('table.hasBorder tbody tr')
    let colNames = $(rows).eq(0)
    let cols = $(colNames).find('th')

    let idxRef = {
        '事實發生日' : 'date_event',
        '重要子公司名稱' : 'branch',
        '主要經營業務' : 'busniess_type',
        '地區' : 'country',
        '符合重要子公司認定之標準(註)': 'status',
    }

    // 設定 key 值
    let idxNo = {}
    let keys = Object.keys(idxRef)
    for(let i=0; i<cols.length; i++){  
        let colName = ($(cols).eq(i).text()).trim()
        if(keys.includes(colName)){
            idxNo[i] = idxRef[colName]
        }
        
    }
    
    // 儲存資料
    for(let i=1 ; i<rows.length; i++){
        let datas = {}
        let cols = $(rows).eq(i).find('td')
        for(let j=0; j<cols.length; j++){
            let colData = ($(cols).eq(j).text()).trim()
            datas[idxNo[j]] = colData
        }
        info.push(datas)
    }
    return info
}

module.exports = {mainPrase};