const express             = require('express')
const passport            = require('passport')
const LocalStrategy       = require('passport-local').Strategy
const publicController    = require('./controllers/publicController')
const User                = require('./models/userModel')
const PublicRoutes        = require('./routes/publicRoutes')
const userRoutes          = require('./routes/userRoutes')
const session             = require('express-session')
const MongoStore          = require('connect-mongo')(session);
const flash               = require('express-flash')
const bcrypt              = require('bcrypt') 
const app                 = express()
const Initialize          = require('./config/passport')

// config passport
Initialize(passport)

// config the view engine
app.set('view engine' , 'ejs')

// Middelwares
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(express.static('public'))
app.use(flash())
app.use(session({
     secret : 'thi64387643876324g348243',
     resave : false,
     saveUninitialized : false,
     store: new MongoStore(options)
}))

const isUserAuthenticate = (req,res,next) => {
     if(req.isAuthenticated()) {
          next()
     } else {
     return res.redirect('/login')
     }
}


// Define a middleware to make 'user' available in all views
app.use((req, res, next) => {
     res.locals.user = req.user;
     next();
});




// passport
app.use(passport.initialize())
app.use(passport.session())



app.use(PublicRoutes)
app.use('/user' , isUserAuthenticate , userRoutes)


module.exports = app
