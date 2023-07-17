const Article = require('../models/articleModel')

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


exports.getAllArticles = (req, res) => {
     const userID = req.user.id;
     Article.find({userID : userID})
}

exports.GetAddArticle = (req, res) => {
     res.render('user/add-article' , {user: req.user})
}



// post requests 
exports.AddArticle = (req, res) => {
     const title = req.body.title;
     const description = req.body.description;
     const category = 'technologie';
     const body = req.body.body;
     const author = req.user.name
     const userID = req.user.id

     const newArticle = new Article({
          author : author,
          title : title,
          description : description,
          category : category,
          body : body,
          userID : userID
     })

     newArticle.save()
     .then(() => {
          res.redirect('/')
     })

     
}

exports.getUserArticles = (req, res) => {
     const userID = req.user.id;
     Article.find({userID : userID})
     .then(articles => {
          res.render('user/User-article' , {articles , user: req.user})
     })
}