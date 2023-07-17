const express             = require('express')
const passport            = require('passport')
const LocalStrategy       = require('passport-local').Strategy
const userController      = require('../controllers/userController')
const Article = require('../models/articleModel')
const user                = express.Router()


// ========== middelwares ========== //

// check if the user is authenticate
const isUserAuthenticate = (req,res,next) => {
     if(req.isAuthenticated()) {
          next()
     } else {
     return res.redirect('/login')
     }
}

const AlreadyLogin = (req,res,next) => {
     if(req.isAuthenticated()) {
          return res.redirect('/dashboard')
     } else {
     next()
     }
}

// this middelware is to hide some element if the user is not login yet
const weHaveAuser = (req,res,next) => {
     if (req.isAuthenticated()) {
          return next();
        } 
        next()
}


/* ========== HANDLER GET REQUESTES ========== */ 

user.get('/',weHaveAuser, (req,res) => {
     res.send('<h1>user info Page</h1>')
})

user.get('/dashboard',weHaveAuser, isUserAuthenticate,(req,res) => {
     res.render('user/dashboard' , {user : req.user})
})
user.get('/new',weHaveAuser, userController.GetAddArticle)
user.post('/new' , userController.AddArticle)

user.get('/articles',weHaveAuser, userController.getUserArticles)

// delete post
user.post('/article/delete/' ,weHaveAuser, (req,res) => {
     const postID = req.body.postID
     Article.findByIdAndDelete(postID)
     .then(() => {
          res.redirect('/user/articles')
     })
} )
// logout
user.get('/logout',weHaveAuser , (req, res) => {
     req.logout(()=>{res.redirect('/')})
     
})

/* ========== HANDLER POST REQUESTES ========== */ 

user.post('/articles/new', userController.AddArticle)

module.exports = user;