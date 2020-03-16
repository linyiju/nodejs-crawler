function createHeader(url){
    const option = {
        url:url,
        headers:{
            'Accept':'text/html',
            'Accept-charset':'utf8',
            'Catch-Control' : 'max-page=0',
            'Connection':'keep-alive',
            'Accept-Language':'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
            'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
        }
    };

    return option;
}

module.exports = createHeader;