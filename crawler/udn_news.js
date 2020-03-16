const createHeader = require('./requestHeader')
const request = require('request')
const cherrio = require('cheerio')
const fs = require('fs')

const udn_urls = function (ids){
    let url_list = [];
    for(i=0; i<=ids; i++){
        let accurate_url = `https://udn.com/news/breaknews/1/${i}`;
        url_list.push(accurate_url);
    };

    return url_list;
}

function undCrawl(udn_url){
    for(const url of udn_url){
        request(createHeader(url), function(err, res, body){
        if(err){
            console.log('Error');
        }
    
        if(res.statusCode == 200){
            let $ = cherrio.load(body,{
            decodeEntities:false,
        });
    
            // Every titles
            let titles = [];
            $('.story-list__text h2').each(function(i,e){
                titles[i] = $(this).text().trim();
            });
        
            // Every content
            let contents = [];
            $('.story-list__text p').each(function(i,e){
                contents[i] = $(this).text().trim();
            });
        
            // Every url
            let urls = [];
            $('.story-list__text h2 a').each(function(i,e){
                urls[i] = 'https://udn.com/'+$(this).attr('href');
            });        
        
            // Every Create time
            let create_times = [];
            $('.story-list__time').each(function(i,e){
                create_times[i] = $(this).text().trim();
            });

            //Json Document
            let data={};
            data.und_news=[]
        
            for (i=0;i<titles.length; i++){
                let news={
                    titles:titles[i], 
                    content:contents[i], 
                    url:urls[i],
                    create_time:create_times[i],
                };
                data.und_news.push(news)
            };
            const jsonData  = JSON.stringify(data,null,4);
            fs.writeFile('udn_news.json', jsonData, {flag:'a', encoding:'UTF-8'},
    function(err){
        if(err){
            console.log('Json File Error');
        }
        console.log('Json File Success!');
    });
        }
        console.log('Finish!');
    
        });
    
    }
    
}


undCrawl(udn_urls(12))