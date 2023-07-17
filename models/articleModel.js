const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
     author : {
          type : String,
          require : [true , 'author Required']
     },
     userID : {
          type : String,
          require : true 
     },
     title : {
          type : String,
          require : [true , 'Title Required']
     },
     description : {
          type : String,
          require : [true , 'description Required']
     },
     category : {
          type : String,
          require : [true , 'category Required']
     },
     body : {
          type : String,
          require : [true , 'body Required']
     },
     
}, {timestamps : true})

const Article = mongoose.model('article', articleSchema)
module.exports = Article