const mysql = require('mysql')

const db = require('../database/connctionDb')



exports.indexfiliere = (req, res) => {

    if(req.session.loggedin == true){
        db.query('SELECT * FROM filières', (err, rows) => {
            if (!err) {
                return res.render('indexfiliere', { rows,name:req.session.name })

            } else {
                console.log(err)

            }
        })
          
    }
    else{
        return res.redirect('/login')
    }
    
}


exports.addfiliere = (req, res) => {
    if(req.session.loggedin == true){
            return res.render('addfiliere',{name:req.session.name})
        }
    else{
            return res.redirect('/login')
    }
}




exports.createfiliere = (req, res) => {
    const {
        libellé
    } = req.body;

    

            db.query('INSERT INTO filières SET libellé=?', [libellé], (err, rows) => {

               
                if (!err) {
                    res.redirect('/indexfiliere')

                } else {
                    console.log(err)

                }
            })
       
 
}





exports.editfiliere = (req, res) => {
    if(req.session.loggedin == true){
       db.query('SELECT * FROM filières WHERE id=?', [req.params.id], (err, rows) => {

           if (!err) {
               return res.render('editfiliere', { rows,name:req.session.name })


           } else {
               console.log(err)

           }
      
   })
   }
   else{
           return res.redirect('/login')
   }
}


exports.updatefiliere = (req, res) => {
    const {
        libellé
    } = req.body;
    db.query('UPDATE filières SET libellé=? WHERE id=?', [libellé, req.params.id], (err, rows) => {

        if (!err) {
           return res.redirect('/indexfiliere')

        } else {
            console.log(err)

        }
    })

}





exports.deletefiliere = (req, res) => {
    
    if(req.session.loggedin == true){
        db.query('DELETE FROM filières WHERE id=?', [req.params.id], (err) => {
            if (!err) {
               return res.redirect('/indexfiliere')

            } else {
                console.log(err)

            }
       
    })
    }
    else{
            return res.redirect('/login')
    }
}