const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
    all(callback){
       db.query(`SELECT * FROM chefs`, function(err, results){
           if(err) throw `${err}`

           callback(results.rows)
       })   
    },
    find(id, callback){
       db.query(`SELECT * FROM chefs WHERE id = $1`, [id],function(err , results){
           if(err) throw `${err}`

           callback(results.rows[0])
       })
    },
    create(data , callback){
        const query = `
        INSERT INTO chefs(
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