const db = require('../../config/db')

module.exports = {
    all(callback){
       db.query(`SELECT * FROM Chefs`, function(err, results){
           if(err) throw `${err}`

           callback(results.rows)
       })   
    },
    create(data , callback){
        const query = `
        INSERT INTO Chefs(
            avatar,
            nome_chef
        ) VALUES ($1 , $2)
        `
        
        const values = [
            data.avatar,
            data.nome_chef
        ]

        db.query(query , values, function(err , results){
            if(err) throw `${err}`
            
            callback(results.rows[0])
        })
    }

}