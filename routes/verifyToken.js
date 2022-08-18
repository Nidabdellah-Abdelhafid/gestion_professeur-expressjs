const jwt=require('jsonwebtoken')

const db = require('../database/connctionDb')

module.exports = function(req,res,next){
    const token = req.header('auth-token')
    if(!token) return res.status(401).send('Access Denied')
    try {
        
        db.query('SELECT email from users WHERE email=?', [email], async (err, rows) => {
        
            if(err){console.log(err)}
            const verified= jwt.verify(token,process.env.TOKEN_SCRET)
            req.rows[0]=verified
            next()
        })
    } catch (error) {
        res.status(401).send('Invalid Token')
    }
}

