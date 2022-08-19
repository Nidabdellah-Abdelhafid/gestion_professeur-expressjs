const mysql = require('mysql')
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user:  process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

db.connect((err)=>{
    if(!err) console.log('connected to database .... ')
    else console.log(err)
})

module.exports=db;