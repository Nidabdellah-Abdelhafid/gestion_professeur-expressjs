const mysql = require('mysql')

const db = require('../database/connctionDb')



exports.indexdashbord= (req, res) => {

    if(req.session.loggedin == true){
        db.query('SELECT count(id)as nombreProfesseurs FROM professeurs', (err, rows) => {
            if (!err) {
                
                return res.render('index', { rows,name:req.session.name,nombreProfesseurs:rows[0].nombreProfesseurs })
                

            } else {
                console.log(err)

            }
        })
          
    }
    else{
        return res.redirect('/login')
    }
    
}



exports.indexmethod = (req, res) => {
   
    if(req.session.loggedin == true){
        db.query('SELECT * FROM professeurs', (err, rows) => {
            if (!err) {
                db.query('SELECT * FROM filières', (err, rows1) => {
                    if (!err) {
                        
                        return res.render('listprofesseurs', {rows,rows1,name:req.session.name })
        
                    } else {
                        console.log(err)
        
                    }
                })

            } else {
                console.log(err)

            }
        })
          
    }
    else{
        return res.redirect('/login')
    }
    
}



exports.indexmethodfind = (req, res) => {
    const {
        searchbar
    } = req.body;

    if(req.session.loggedin == true){
        db.query('SELECT * FROM `professeurs` WHERE nom like "%'+searchbar+'%" or prenom like "%'+searchbar+'%";', (err, rows) => {
            if (!err) {
                db.query('SELECT * FROM filières', (err, rows1) => {
                    if (!err) {
                        
                        
                        console.log(rows)
                        return res.render('listprofesseurs', { rows,rows1,name:req.session.name })
        
                    } else {
                        console.log(err)
        
                    }
                })

            } else {
                console.log(err)

            }
        })
          
    }
    else{
        return res.redirect('/login')
    }
    
}


exports.addprofesseur = (req, res) => {
    if(req.session.loggedin == true){
            return res.render('/',{name:req.session.name})
        }
    else{
            return res.redirect('/login')
    }
}



exports.createprofesseur = (req, res) => {
    const {
        nom,
        prenom,
        libelle
    } = req.body;

    let photo;
    let pathphoto;

    if (!req.files || Object.keys(req.files).length === 0) {
        
        return res.status(404).send('<h1>No file uploaded</h1>')
    }
    photo = req.files.photo

    pathphoto = __dirname + '/upload/' + photo.name
    photo.mv(pathphoto, function(err) {
        if (err) return res.status(500).send(err)


            db.query('INSERT INTO professeurs SET nom=?, prenom=?,libellé=?, photo=?', [nom, prenom,libelle, photo.name], (err, rows) => {

               
                if (!err) {
                    res.redirect('/')

                } else {
                    console.log(err)

                }
            })
       
    })
}



exports.editprofesseur = (req, res) => {
     if(req.session.loggedin == true){
        db.query('SELECT * FROM professeurs WHERE id=?', [req.params.id], (err, rows) => {

            if (!err) {

                db.query('SELECT * FROM filières', (err, rows1) => {

                    if (!err) {
                        return res.render('editprofesseurs', { rows1,rows,name:req.session.name })
        
        
                    } else {
                        console.log(err)
        
                    }
               
            })
               


            } else {
                console.log(err)

            }
       
    })

    
    }
    else{
            return res.redirect('/login')
    }
}



exports.updateprofesseur = (req, res) => {
    const {
        nom,
        prenom,
        libelle
    } = req.body;

    let photo;
    let pathphoto;

    if (!req.files || Object.keys(req.files).length === 0) {
        photom = req.body.photo1

        db.query('UPDATE professeurs SET nom=?, prenom=?,libellé=?, photo=? WHERE id=?', [nom, prenom,libelle, photom, req.params.id], (err, rows) => {

                
                    if (!err) {
                        return res.redirect('/')

                    } else {
                        console.log(err)

                    }
                })

    }
    else{

    photo = req.files.photo

    pathphoto = __dirname + '/upload/' + photo.name
    photo.mv(pathphoto, function(err) {
        if (err) return res.status(500).send(err)

            db.query('UPDATE professeurs SET nom=?, prenom=?,libellé=?, photo=? WHERE id=?', [nom, prenom,libelle, photo.name, req.params.id], (err, rows) => {

                if (!err) {
                   return res.redirect('/')

                } else {
                    console.log(err)

                }
            })
       
    })
    }
}



exports.viewprofesseur = (req, res) => {
   if(req.session.loggedin == true){
        db.query('SELECT * FROM professeurs  WHERE  id=?; ', [req.params.id], (err, rows) => {

            if (!err) {
               
               return res.render('viewprofesseurs', {
                    rows,
                    name:req.session.name
                })

            } else {
                console.log(err)

            }
       
    })
    }
    else{
            return res.redirect('/login')
    }
}



exports.deleteprofesseur = (req, res) => {
    
    if(req.session.loggedin == true){
        db.query('DELETE FROM professeurs WHERE id=?', [req.params.id], (err) => {
            if (!err) {
               return res.redirect('/')

            } else {
                console.log(err)

            }
       
    })
    }
    else{
            return res.redirect('/login')
    }
}

