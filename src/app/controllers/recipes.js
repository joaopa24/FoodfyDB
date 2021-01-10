const db = require('../../config/db')

module.exports = {
    home(req, res) {
        return res.render("home", { items: data.recipes })
    },
    recipes(req, res) {
        return res.render("receitas", { items: data.recipes })
    },
    about(req, res) {
        return res.render("sobre")
    },
    recipe(req, res) {
        const id = req.params.id;
        const Recipes = data.recipes.find(function (recipe) {
            if (recipe.id == id) {
                return true
            }
            if (!recipe.id) {
                return res.send("video not found")
            }
        })

        const recipe = {
            ...Recipes,

        }
        return res.render("Receita", { recipe })
    },
    index(req, res) {
        return res.render("Admin/index", { recipes: data.recipes })
    },
    create(req, res) {
        return res.render("Admin/create")
    },
    recipe_admin(req, res) {
        const id = req.params.id;
        const Recipes = data.recipes.find(function (recipe) {
            if (recipe.id == id) {
                return true

            }
            if (!recipe.id) {
                return res.send("video not found")
            }
        })

        const recipe = {
            ...Recipes,
        }

        return res.render("Admin/recipe", { recipe })
    },
    recipe_admin_edit(req, res) {
        const { id } = req.params
        const foundrecipe = data.recipes.find(function (recipe) {
            return recipe.id == id
        })
        if (!foundrecipe) {
            return res.send("Professor não encontrado")
        }

        const recipe = {
            ...foundrecipe
        }

        return res.render(`Admin/edit`, { recipe })
    },
    post(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "")
                return res.send("porfavor preencha todos os campos")
        }


        let { image, title, description, id, featured, ingredients, preparation, textarea } = req.body

        data.recipes.push({
            id,
            image,
            ...req.body
        })

        fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
            if (err) return res.send("write file error!")
            return res.redirect(`/admin/Receitas/${id}`)
        })
    },
    put(req, res) {
        const { id } = req.body
        let index = 0

        const FoundRecipe = data.recipes.find(function (recipe, Foundindex) {
            if (recipe.id == id) {
                index = Foundindex
                return true
            }
        })

        if (!FoundRecipe) {
            return res.send("Receita não encontrada")
        }

        const Recipe = {
            ...FoundRecipe,
            ...req.body
            /* só funciona se colocar o req.body tbm*/
        }

        data.recipes[index] = Recipe

        fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
            if (err) return res.send("write error!")

            return res.redirect(`/admin/Receitas/${id}`)
        })
    },
    delete(req, res) {
        const { id } = req.body

        const filteredrecipe = data.recipes.filter(function (recipe) {
            return recipe.id != id
        })

        data.recipes = filteredrecipe
        fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
            if (err) return res.send("write error!")

            return res.redirect("/admin/Receitas")
        })
    }
}