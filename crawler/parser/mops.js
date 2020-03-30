const cheerio = require('cheerio');
const moment = require('moment');


function mainPrase(html){
    let $ = cheerio.load(html,{
        decodeEntities:false
    })
    let info = {}
    let dom_compContent = $('#zoom #table01')
    if (undefined == dom_compContent) throw new Error('No Data!')

    let cmpyRows = $('table.hasBorder tbody tr')
    for (let i=0; i<cmpyRows.length; i++){
        let colName = ($(cmpyRows).find('th').eq(i).text()).trim()
        let colData = ($(cmpyRows).find('td').eq(i).text()).trim()
        switch(true){
            case /股票代號/.test(colName):
                info['id'] = colData
                break
            
            case /產業類別/.test(colName):
                info['type'] = colData
                break

            case /外國企業註冊地國/.test(colName):
                if(isNaN(colData)){
                    info['foreign_country'] = ''
                }else{
                    info['foreign_country'] = colData
                }
                break
            
            case /公司名稱/.test(colName):
                info['name'] = colData
                break
            
            case /地址/.test(colName):
                info['address'] = colData
                break
            
            case /董事長/.test(colName):
                info['ceo'] = colData
                break

            case /總經理/.test(colName):
                info['manager'] = colData
                break
            
            case /^發言人$/.test(colName):
                info['spokesman'] = colData
                break
            
            case /發言人電話$/.test(colName):
                info['spokesman_phone'] = colData
                break

            case /代理發言人/.test(colName):
                info['deputy_spokesman'] = colData
                break

            case /主要經營業務/.test(colName):
                info['main_business'] = colData
                break
            
            case /公司成立日期/.test(colName):
                colData = parseInt(colData.replace(/\//g,''))+19110000
                colData = moment(colData, 'YYYYMMDD').format('YYYY-MM-DD')
                info['created_at'] = colData 
                break

            case /營利事業統一編號/.test(colName):
                info['uni_id'] = colData 
                break

            case /實收資本額/.test(colName):
                colData = parseInt(colData.replace(/,/g, '').replace('元',''))
                info['asset'] = colData 
                break

            case /上市日期/.test(colName):
                colData = parseInt(colData.replace(/\//g,''))
                if(colData){
                    colData = moment(colData+19110000, 'YYYYMMDD').format('YYYY-MM-DD')
                    info['launch_date'] = colData 
                }else{
                    colData = moment(colData+19110000, 'YYYYMMDD').format('YYYY-MM-DD')
                    info['launch_date'] = ''
                }
                break

            case /上櫃日期|上櫃日期|興櫃日期|公開發行日期/.test(colName):
                colData = parseInt(colData.replace(/\//g,''))
                if(colData){
                    colData = moment(colData+19110000, 'YYYYMMDD').format('YYYY-MM-DD')
                    if(/上市日期/.test(colName)) info['listed_date'] = colData 
                    if(/上櫃日期/.test(colName)) info['OTC_date'] = colData 
                    if(/興櫃日期/.test(colName)) info['emerging_date'] = colData 
                    if(/公開發行日期/.test(colName)) info['public_date'] = colData 
                }else{
                    if(/上市日期/.test(colName)) info['listed_date'] = '' 
                    if(/上櫃日期/.test(colName)) info['OTC_date'] = '' 
                    if(/興櫃日期/.test(colName)) info['emerging_date'] = '' 
                    if(/公開發行日期/.test(colName)) info['public_date'] = ''
                }
                break
            case /普通股每股面額/.test(colName):
                colData = parseInt(colData.replace('新台幣 ','').replace('元',''))
                info['per_stock_value'] = ''
                break

            case /已發行普通股數或TDR原股發行股數|特別股/.test(colName):
                colData = parseInt(colData.split('股')[0].replace(/,/g,''))
                if(colData){
                    if (/已發行普通股數或TDR原股發行股數/.test(colName)) info['per_stock_value'] = colData
                    if (/特別股/.test(colName)) info['per_stock_value'] = colData
                }else{
                    if (/已發行普通股數或TDR原股發行股數/.test(colName)) info['per_stock_value'] = ''
                    if (/特別股/.test(colName)) info['per_stock_value'] = -1
                }
                break

            case /^電話$/.test(colName):
                info['phone'] = colData
                break
            
            case /^簽證會計師事務所$/.test(colName):
                info['account_agency']=colData
                break
        }
    }

    return info
}
    
module.exports = {mainPrase};