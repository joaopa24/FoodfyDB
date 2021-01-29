const db = require('../../config/db')

module.exports = {
    all(callback){
       db.query(`SELECT * FROM Chefs`, function(err, results){
           if(err) throw `${err}`

           callback(results.rows)
       })   
    }

}