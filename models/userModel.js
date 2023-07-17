const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
     name : {
          type : String,
          required : [true, 'Your Full Name Is Required']
     },
     role : {
          type : String,
     },
     email : {
          type : String,
          required : [true, 'Your E-Mail Is Required'],
          unique : true
     },
     password : {
          type : String,
          required : [true, 'Your Password Is Required']
     }
     
}, {timestamps : true})

const User = mongoose.model('user', userSchema)
module.exports = User;