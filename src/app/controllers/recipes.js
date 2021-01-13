const Intl = require('intl')
const { all } = require('../../../../Modulo-5/src/app/models/instructor')
const { date } = require("../../lib/utils")
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
        Recipe.all(function(recipes) {
            return res.render("Admin/index", { recipes })
        })
    },
    create(req, res) {
        return res.render("Admin/create")
    },
    recipe_admin(req, res) {
        const id = req.params.id;
        
        Recipe.find(id , function(recipe) {
            return res.render("Admin/recipe", { recipe })
        })
        
    },
    recipe_admin_edit(req, res) {
        const { id } = req.params
        
        Recipe.find(id , function(recipe) {
            if(!recipe) return res.send("Receita não encontrada")

            return res.render(`Admin/edit` , { recipe })
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
        
        Recipe.update(req.body, function(){
            return res.render(`/admin/Receitas/${req.body.id}`)
        })
    },
    delete(req, res) {
        const { id } = req.body

        return res.render("/admin/Receitas")
    }
}