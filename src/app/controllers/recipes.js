const Recipe = require("../models/recipe")

module.exports = {
    home(req, res) {
        Recipe.all(function(recipes) {
            Recipe.chefsOption(function(chefsOptions){
                return res.render("home", { chefsOptions , recipes })
            })
        })
    },
    recipes(req, res) {
        Recipe.all(function(recipes) {
            Recipe.chefsOption(function(chefsOptions){
                return res.render("receitas", { chefsOptions , recipes })
            })
        })
    },
    about(req, res) {
        return res.render("sobre")
    },
    recipe(req, res) {
        const id = req.params.id;
        
        Recipe.find(id , function(recipe) {
            Recipe.chefsOption(function(chefsOptions){
                return res.render("Receita", { chefsOptions , recipe })
            })
        })
    },
    index(req, res) {
        Recipe.all(function(recipes) {
            Recipe.chefsOption(function(chefsOptions){
                return res.render("Admin/index", { chefsOptions , recipes })
            })
        })
    },
    create(req, res) {
        Recipe.chefsOption(function(chefsOptions){
            return res.render("Admin/create", { chefsOptions })
        })
    },
    recipe_admin(req, res) {
        const id = req.params.id;
        
        Recipe.find(id , function(recipe) {
            Recipe.chefsOption(function(chefsOptions){
                return res.render("Admin/recipe", { chefsOptions , recipe })
            })
        })
        
    },
    recipe_admin_edit(req, res) {
        const { id } = req.params
        
        Recipe.find(id , function(recipe) {
            if(!recipe) return res.send("Receita não encontrada")
            
            Recipe.chefsOption(function(chefsOptions){
                return res.render("Admin/edit", { chefsOptions , recipe })
            })
        })
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
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                console.log(key)
                return res.send("porfavor preencha todos os campos")
            }
        }
        console.log(req.body)
        Recipe.update(req.body, function(){
            return res.redirect(`/admin/Receitas/${req.body.id}`)
        })
    },
    delete(req, res) {
        const { id } = req.body

        return res.render("/admin/Receitas")
    }
}