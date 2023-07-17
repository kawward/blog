const express             = require('express')
const passport            = require('passport')
const LocalStrategy       = require('passport-local').Strategy
const publicController    = require('../controllers/publicController')
const userController    = require('../controllers/userController')
const Article             = require('../models/articleModel')
const public              = express.Router()


// ========== middelwares ========== //

// check if the user is authenticate 
const isUserAuthenticate = (req,res,next) => {
     if(req.isAuthenticated()) {
          next()
     } else {
     return res.redirect('/login')
     }
}
// if user is login do not show login/register pages
const AlreadyLogin = (req,res,next) => {
     if(req.isAuthenticated()) {
          return res.render('/user/dashboard')
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



// Get The Login Page
public.get('/login' ,AlreadyLogin, (req, res) => {
     res.render('login')
})

/* ========== HANDLER GET REQUESTES ========== */ 
public.get('/new' , (req,res) => {
     res.redirect('/user/new')
})
// Get The Register Page
public.get('/register',AlreadyLogin ,(req, res) => {
     res.render('register')
})

// Get The Members Area Page
public.get('/' , weHaveAuser ,(req, res) => {
     Article.find().sort({createdAt : -1})
     .then(articles => {
          res.render('home' , {articles, user: req.user})
     })
     
})

// contact 
public.get('/contact' , (req,res) => {
     res.redirect('https://about.me/mohamedbella')
})

public.get('/article/:id',weHaveAuser, publicController.getSingleArticle)

/* ========== HANDLER POST REQUESTES ========== */ 

// Register A New public
public.post('/register' , publicController.Register)

// Login 
public.post('/login' , passport.authenticate('local', {
     successRedirect : '/user/dashboard',
     failureRedirect : '/login',
     failureFlash    :  true 
}))

module.exports = public;