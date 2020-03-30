const cheerio = require('cheerio');
const moment = require('moment');


function mainPrase(html){
    let $ = cheerio.load(html,{
        decodeEntities:false
    })
    let info = {}
    let dom_compContent = $('#zoom #table01')
    if (undefined == dom_compContent) throw new Error('No Data!')

    let cmpyRows = $('table.hasBorder tbody tr th')
    for (let i=0; i<cmpyRows.length; i++){
        let colName = ($(cmpyRows).eq(i).text()).trim()
        let colData_1 = ($('table.hasBorder tbody tr td.lColor').eq(i).text()).trim()
        let colData_2 = ($('table.hasBorder tbody tr td.lColor').eq(i-2).text()).trim()
        switch(true){
                case /股票代號/.test(colName):
                    info['id'] = colData_1
                    break
                
                case /產業類別/.test(colName):
                    info['type'] = colData_1
                    break

                case /外國企業註冊地國/.test(colName):
                    if(isNaN(colData_1)){
                        info['foreign_country'] = ''
                    }else{
                        info['foreign_country'] = colData_1
                    }
                    break
                
                case /^公司名稱$/.test(colName):
                    info['name'] = colData_1
                    break
                
                case /^地址$/.test(colName):
                    info['address'] = colData_1
                    break
                
                case /董事長/.test(colName):
                    info['ceo'] = colData_1
                    break

                case /總經理/.test(colName):
                    info['manager'] = colData_1
                    break
                
                case /^發言人$/.test(colName):
                    info['spokesman'] = colData_1
                    break
                
                case /發言人電話$/.test(colName):
                    info['spokesman_phone'] = colData_1
                    break

                case /代理發言人/.test(colName):
                    info['deputy_spokesman'] = colData_1
                    break

                case /主要經營業務/.test(colName):
                    info['main_business'] = colData_1
                    break
                
                case /公司成立日期/.test(colName):
                    colData_1 = parseInt(colData_1.replace(/\//g,''))+19110000
                    colData_1 = moment(colData_1, 'YYYYMMDD').format('YYYY-MM-DD')
                    info['created_at'] = colData_1 
                    break

                case /營利事業統一編號/.test(colName):
                    info['uni_id'] = colData_1 
                    break

                case /實收資本額/.test(colName):
                    colData_1 = parseInt(colData_1.replace(/,/g, '').replace('元',''))
                    info['asset'] = colData_1 
                    break

                case /上市日期/.test(colName):
                    colData_1 = parseInt(colData_1.replace(/\//g,''))
                    if(colData_1){
                        colData_1 = moment(colData_1+19110000, 'YYYYMMDD').format('YYYY-MM-DD')
                        info['launch_date'] = colData_1 
                    }else{
                        colData_1 = moment(colData_1+19110000, 'YYYYMMDD').format('YYYY-MM-DD')
                        info['launch_date'] = ''
                    }
                    break

                case /上櫃日期|上櫃日期|興櫃日期|公開發行日期/.test(colName):
                    colData_1 = parseInt(colData_1.replace(/\//g,''))
                    if(colData_1){
                        colData_1 = moment(colData_1+19110000, 'YYYYMMDD').format('YYYY-MM-DD')
                        if(/上市日期/.test(colName)) info['listed_date'] = colData_1 
                        if(/上櫃日期/.test(colName)) info['OTC_date'] = colData_1 
                        if(/興櫃日期/.test(colName)) info['emerging_date'] = colData_1 
                        if(/公開發行日期/.test(colName)) info['public_date'] = colData_1 
                    }else{
                        if(/上市日期/.test(colName)) info['listed_date'] = '' 
                        if(/上櫃日期/.test(colName)) info['OTC_date'] = '' 
                        if(/興櫃日期/.test(colName)) info['emerging_date'] = '' 
                        if(/公開發行日期/.test(colName)) info['public_date'] = ''
                    }
                    break
                case /普通股每股面額/.test(colName):
                    colData_1 = parseInt(colData_1.replace('新台幣 ','').replace('元',''))
                    info['per_stock_value'] = ''
                    break

                case /已發行普通股數或TDR原股發行股數|特別股/.test(colName):
                    colData_1 = parseInt(colData_1.split('股')[0].replace(/,/g,''))
                    if(colData_1){
                        if (/已發行普通股數或TDR原股發行股數/.test(colName)) info['per_stock_value'] = colData_1
                        if (/特別股/.test(colName)) info['sepc_stock_value'] = colData_1
                    }else{
                        if (/已發行普通股數或TDR原股發行股數/.test(colName)) info['per_stock_value'] = -1
                        if (/特別股/.test(colName)) info['sepc_stock_value'] = -1
                    }
                    break

                case /^電話$/.test(colName):
                    info['phone'] = colData_1
                    break
                
                case /^簽證會計師事務所$/.test(colName):
                    info['account_agency']=colData_1
                    break

                case /^普通股盈餘分派或虧損撥補頻率$/.test(colName):
                    info['frequent']=colData_1
                    break
                
                case /^普通股年度 (含第4季或後半年度)現金股息及紅利決議層級$/.test(colName):
                    info['level']=colData_1
                    break
                
                case /^股票過戶機構/.test(colName):
                    info['stock_institution']=colData_1
                    break

                case /^過戶地址$/.test(colName):
                    info['institution_address']=colData_1
                    break

                case /簽證會計師1$/.test(colName):
                    info['account_1']=colData_1
                    break
                
                case /簽證會計師2$/.test(colName):
                    info['account_2']=colData_1
                    break

            case /^英文簡稱$/.test(colName):
                info['eng_name']=colData_2                     
                break

            case /^英文全名$/.test(colName):
                info['eng_whole_name']=colData_2                         
                break

            case /^英文通訊地址\(街巷弄號\)$/.test(colName):
                info['eng_address']=colData_2 
                break

            case /^英文通訊地址\(縣市國別\)$/.test(colName):
                info['eng_country']=colData_2  
                break

            case /^傳真機號碼$/.test(colName):
                info['tax_phone'] = colData_2
                break
            
            case /電子郵件信箱$/.test(colName):
                info['email'] = colData_2
                break
            
            case /^公司網址$/.test(colName):
                info['web'] = colData_2
                break
            
            case /^投資人關係聯絡人$/.test(colName):
                info['investor_contact'] = colData_2
                break
            
            case /^投資人關係聯絡人職稱$/.test(colName):
                info['investor_contact_title'] = colData_2
                break

            case /^投資人關係聯絡電話$/.test(colName):
                info['investor_phone'] = colData_2
                break
            
            case /^投資人關係電子郵件$/.test(colName):
                info['investor_email'] = colData_2
                break

            case /^公司網站內利害關係人專區網址$/.test(colName):
                info['investor_web'] = colData_2
                break

            case /^變更前名稱$/.test(colName):
                info['changed_name']= colData_2
                break
            
            case /^變更前簡稱$/.test(colName):
                info['shorten_changed_name'] = colData_2
                break
            
            case /^公司名稱變更核准日期$/.test(colName):
                info['confirmed_date'] = colData_2
                break
        }
    }

    return info
}
    
module.exports = {mainPrase};