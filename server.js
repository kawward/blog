const mongoose = require('mongoose');
const app = require('./app')
//Set up default mongoose connection
var mongoDB = 'mongodb+srv://mohamedbella:mohamedbella@blog.l8fcx9z.mongodb.net/blog';
mongoose.connect(mongoDB, { useNewUrlParser: true,useUnifiedTopology: true })
.then(() => {
     console.log('DATAbase connected successfuly')
     app.listen(3001)
}) 
