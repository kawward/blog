const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const Article = require('../models/articleModel')



exports.Register = async (req, res) => {

     const name = req.body.name;
     const email = req.body.email;
     const password = await bcrypt.hash(req.body.password , 10);

     // CHECK IF THE EMAIL IS ALREADY USED 
    
     // ADD USER TO DATABASE
     const newUser = new User({
          name : name,
          email : email,
          password : password,
     })
     newUser.save()
     .then(() => {
          res.redirect('/login')
     })
     .catch (e => {
          res.redirect('/register')
     })
}

exports.getSingleArticle = (req, res) => {
     const articleID = req.params.id;
     Article.findById(articleID)
     .then(article => {
          res.render('article' , {article , user: req.user})
     })
}