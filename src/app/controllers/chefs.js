const Chef = require("../models/chef")

module.exports = {
    chefs(req, res){
        return res.render("chef")
    },
    chefsAdmin(req, res){
        return res.render('Admin/chefs') 
    },
    chefsCreate(req, res){
        return res.render('Admin/createChef')
    },
    post(req, res){
        const keys = Object.keys(req.body)
        for(key of keys){
            if(req.body[key] == ""){
                return res.send("Preencha todos os campos!")
            }
        }
       
        Chef.create(req.body, function(Chef){
            return res.redirect(`/admin/Chefs/${Chef.id}`)
        }) 
    }
}