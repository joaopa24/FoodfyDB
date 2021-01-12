const db = require('../../config/db')
const { date , feature } = require("../../lib/utils")

module.exports = {
    create(data , callback){
        const query = `
           INSERT INTO recipes(
               chef_id,
               image,
               title,
               ingredients,
               preparation,
               information,
               created_at,
               feature
           ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
             RETURNING id
        `
        const values = [
               data.chef_id, 
               data.image,
               data.title,
               data.ingredients,
               data.preparation,
               data.textarea,
               date(Date.now()).iso,
               feature(data.featured)
        ]

        db.query(query , values ,function(err , results) {
            if(err) throw `Database ${err}`

            callback(results.rows[0])
        })
    },
    find(id , callback){
        db.query(`SELECT * FROM recipes WHERE id = $1`, [id], function(err , results){
            if(err) throw `Database ${err}`

            callback(results.rows[0])
        })
    },
    update(data , callback){
        const query = `
        UPDATE recipes SET 
            chef_id=($1),
            image=($2),
            title=($3),
            ingredients=($4),
            preparation=($5),
            information=($6),
            created_at=($7),
            feature=($8)
            WHERE id = $9
     `
     const values = [
            data.chef_id, 
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.textarea,
            date(Date.now()).iso,
            feature(data.featured),
            data.id
     ]

     db.query(query , values ,function(err , results) {
         if(err) throw `Database ${err}`

         callback(results.rows[0])
     })
    }
}