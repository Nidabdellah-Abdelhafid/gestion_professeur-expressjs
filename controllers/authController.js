const mysql = require('mysql')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const Joi = require('@hapi/joi') 

const db = require('../database/connctionDb')



const schema=Joi.object({
    nom:Joi.string().min(7).required(),
    email:Joi.string().min(7).required().email(),
    password:Joi.string().min(7).required()
})

const schemalog=Joi.object({
    
    email:Joi.string().min(7).required().email(),
    password:Joi.string().min(7).required()
})


exports.getregister =  (req, res) => {

    if(req.session.loggedin!= true){
        return res.render('register',
        {
            error: req.flash('msg'),
            emailnotex: req.flash('emailmsgex')
        })
    }
    else{
        return res.redirect('/')
    }

}

exports.logout =  (req, res) => {
    
    if(req.session.loggedin == true){
         req.session.destroy()
    }
    
        return res.redirect('/login')
   

}

exports.register =  (req, res) => {
    const {
        nom,
        email,
        password
    } = req.body;

    const {error} =  schema.validate(req.body)
    if(error) {
       
        req.flash('msg',error.details[0].message)
       return res.redirect('/register')
        
    }

    db.query('SELECT email from users WHERE email=?', [email], async (err, rows) => {
                
        if (err) {
            console.log(err)
        } 

        if(rows.length > 0) {
            req.flash('emailmsgex','Email already exist !!')
          return  res.redirect('/register')
            
        }
        else{
        let hashedPassword= await bcrypt.hash(password,10)
        

        db.query('insert into users set nom=?, email=?,password=?', [nom,email,hashedPassword], (err, rows) => {
            
            if (err) {
                console.log(err)
            } 
            else{
              return  res.redirect('/login')
            }

        })
    }
    
    })

}






exports.getlogin =  (req, res) => {
    if(req.session.loggedin!= true){
        return res.render('login',
        {
            error: req.flash('msg'),
            emailnotex:req.flash('emailmsgex'),
            passInvalid:req.flash('passmsg')
        })
    }
    else{
        return res.redirect('/')
    }



    
}

exports.login =  (req, res) => {
    const {
        email,
        password
    } = req.body;

    const {error} =  schemalog.validate(req.body)
    if(error) {
        req.flash('msg',error.details[0].message)
        
        return res.redirect('/login')
        
    }

    db.query('SELECT email from users WHERE email=?', [email],  (err, rows) => {
                
        if (err) {
            console.log(err)
        } 

        if(rows.length === 0) {
            req.flash('emailmsgex','Email not exist !!')
            return res.redirect('/login')
            
        }
        else{

        db.query('SELECT password from users WHERE email=?', [email], async (err, rows) => {
            
            if (err) {
                console.log(err)
            } 
            else{
                const valpass= await bcrypt.compare(password,rows[0].password)
                
                if(!valpass) {
                    req.flash('passmsg','Invalid password !!')
                    return res.redirect('/login')
                }

                else{ 
                    db.query('SELECT nom from users WHERE email=?', [email], async (err, rows) => {
                    if(err) console.log(err)
                    else{
                        req.session.loggedin=true
                        req.session.name=rows[0].nom

                        return res.redirect('/dashbord')
                }

                })
                }
                
            }

        })
    }
    

    }) 

}