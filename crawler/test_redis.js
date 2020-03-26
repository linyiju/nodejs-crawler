const redis = require('redis');
const Promise = require('bluebird')
const client = redis.createClient();

~async function(){
    let rc = Promise.promisifyAll(client)
    res = await rc.setAsync('name', 'Lynn')
    console.log(res)

    res = await rc.getAsync('name')
    console.log(res)

    await rc.quit()

}();