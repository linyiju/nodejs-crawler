const mysql = require('mysql');
const Promise = require('bluebird');
const Sentry = require('@sentry/node');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync(`${__dirname}/config.json`));

// Mysql
function mysqlPool(info){
    let pool = mysql.createPool(info)
    try{
        let db = Promise.promisifyAll(pool)
        return db
    }catch(e){
        throw new Error(e)
    }
}

// Mysql Insert Function
async function insertInfo(mysql_query, infos){
    let db = mysqlPool(config.mysql)
    try{
        await db.queryAsync(mysql_query, infos)
    }catch(e){
        throw new Error(e) 
    }finally{
        await db.end()
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



module.exports={insertInfo, mysqlPool}