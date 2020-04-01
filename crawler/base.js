const mysql = require('mysql');
const Promise = require('bluebird');
const Sentry = require('@sentry/node');


// Mysql
function mysqlPool(config){
    let pool = mysql.createPool(config)
    try{
        let db = Promise.promisifyAll(pool)
        return db
    }catch(e){
        throw new Error(e)
    }
}

// Redis
async function redis_db(config){
    let  rc = Promise.promisifyAll(config)
    res = await rc.setAsync('name', 'Lynn')
    console.log(res)

    res = await rc.getAsync('name')
    console.log(res)

    await rc.quit()
}

// Sentry
Sentry.init({ dsn: 'https://0af5f97ff40244848bbfcfd21b999273@sentry.io/5182307' })

module.exports={mysqlPool}