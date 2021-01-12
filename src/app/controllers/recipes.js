const Recipe = require("../models/recipe")

module.exports = {
    home(req, res) {
        return res.render("home")
    },
    recipes(req, res) {
        return res.render("receitas")
    },
    about(req, res) {
        return res.render("sobre")
    },
    recipe(req, res) {
        return res.render("Receita")
    },
    index(req, res) {
        return res.render("Admin/index")
    },
    create(req, res) {
        return res.render("Admin/create")
    },
    recipe_admin(req, res) {
        const id = req.params.id;
    
        return res.render("Admin/recipe")
    },
    recipe_admin_edit(req, res) {
        const { id } = req.params
       
        return res.render(`Admin/edit`)
    },
    post(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "")
                return res.send("porfavor preencha todos os campos")
        }

        Recipe.create(req.body, function(recipe){
            return res.redirect(`/admin/Receitas/${recipe.id}`)
        })
    },
    put(req, res) {
        const { id } = req.body
        let index = 0

        return res.render(`/admin/Receitas/${id}`)
    },
    delete(req, res) {
        const { id } = req.body

        return res.render("/admin/Receitas")
    }
}