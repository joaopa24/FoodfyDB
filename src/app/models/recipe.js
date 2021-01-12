const db = require('../../config/db')

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
               created_ad,
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
               data.created_ad,
               data.feature
        ]

        db.query(query , values ,function(err , results) {
            if(err) throw `Database Error ${err}`

            callback(results.rows[0])
        })
    }
}