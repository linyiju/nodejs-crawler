const mysql = require('mysql');
const Promise = require('bluebird')

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

module.exports = {mysqlPool, redis_db}