const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
    all(callback){
       db.query(`SELECT * FROM Chefs`, function(err, results){
           if(err) throw `${err}`

           callback(results.rows)
       })   
    },
    find(id, callback){
       db.query(`SELECT * FROM Chefs WHERE id = $1`, [id],function(err , results){
           if(err) `Database Error ${err}`

           callback(results.rows[0])
       })
    },
    create(data , callback){
        const query = `
        INSERT INTO Chefs(
            avatar_url,
            name,
            created_at
        ) VALUES ($1 , $2, $3)
        `
        
        const values = [
            data.avatar,
            data.nome_chef,
            date(Date.now()).iso
        ]

        db.query(query , values, function(err , results){
            if(err) throw `${err}`
            
            callback(results.rows[0])
        })
    }

}