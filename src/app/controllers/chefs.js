
module.exports = {
    chefs(req, res){
        return res.render("chef")
    },
    chefsAdmin(req, res){
        return res.render('Admin/chefs') 
    },
    chefsCreate(req, res){
        return res.render('Admin/createChef')
    }
}