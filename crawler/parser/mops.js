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
                info['cmpyID'] = parseInt(colData)
                break
            
            case /產業類別/.test(colName):
                info['cmpyType'] = colData
                break

            case /外國企業註冊地國/.test(colName):
                if(isNaN(colData)){
                    info['cmpyForeignCountry'] = ''
                }else{
                    info['cmpyForeignCountry'] = colData
                }
                break
            
            case /公司名稱/.test(colName):
                info['cmpyName'] = colData
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
            
            case /發言人/.test(colName):
                info['spokesman'] = colData
                break
            
            case /發言人電話/.test(colName):
                info['spokesmanPhone'] = colData
                break

            case /代理發言人/.test(colName):
                info['deputyDpokesman'] = colData
                break

            case /主要經營業務/.test(colName):
                info['mainBusiness'] = colData
                break
            
            case /公司成立日期/.test(colName):
                colData = parseInt(colData.replace(/\//g,''))+19110000
                colData = moment(colData, 'YYYYMMDD').format('YYYY-MM-DD')
                info['createAt'] = colData 
                break

            case /營利事業統一編號/.test(colName):
                info['taxID'] = colData 
                break

            case /實收資本額/.test(colName):
                colData = parseInt(colData.replace(/,/g, '').replace('元',''))
                info['taxID'] = colData 
                break

            case /上市日期/.test(colName):
                colData = parseInt(colData.replace(/\//g,''))
                if(colData){
                    colData = moment(colData+19110000, 'YYYYMMDD').format('YYYY-MM-DD')
                    info['launchDate'] = colData 
                }else{
                    colData = moment(colData+19110000, 'YYYYMMDD').format('YYYY-MM-DD')
                    info['launchDate'] = ''
                }
                break

            case /上櫃日期|上櫃日期|興櫃日期|公開發行日期/.test(colName):
                colData = parseInt(colData.replace(/\//g,''))
                if(colData){
                    colData = moment(colData+19110000, 'YYYYMMDD').format('YYYY-MM-DD')
                    if(/上市日期/.test(colName)) info['listedDate'] = colData 
                    if(/上櫃日期/.test(colName)) info['OTCDate'] = colData 
                    if(/興櫃日期/.test(colName)) info['emergingDate'] = colData 
                    if(/公開發行日期/.test(colName)) info['publicDate'] = colData 
                }else{
                    if(/上市日期/.test(colName)) info['listedDate'] = '' 
                    if(/上櫃日期/.test(colName)) info['OTCDate'] = '' 
                    if(/興櫃日期/.test(colName)) info['emergingDate'] = '' 
                    if(/公開發行日期/.test(colName)) info['publicDate'] = ''
                }
                break
            case /普通股每股面額/.test(colName):
                colData = parseInt(colData.replace('新台幣 ','').replace('元',''))
                info['perStockValue'] = ''
                break

            case /已發行普通股數或TDR原股發行股數|特別股/.test(colName):
                colData = parseInt(colData.split('股')[0].replace(/,/g,''))
                if(colData){
                    if (/已發行普通股數或TDR原股發行股數/.test(colName)) info['perStockValue'] = colData
                    if (/特別股/.test(colName)) info['preferredStock'] = colData
                }else{
                    if (/已發行普通股數或TDR原股發行股數/.test(colName)) info['perStockValue'] = ''
                    if (/特別股/.test(colName)) info['preferredStock'] = -1
                }

            case /電話/.test(colName):
                info['phone'] = colData
                break
            
            case /簽證會計師事務所/.test(colName):
                info['accountAgency']=colData
                break
        }
    }
    return info
}
    
module.exports = {mainPrase};