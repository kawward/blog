const mongoose = require('mongoose');
const app = require('./app')
//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/login-register-system';
mongoose.connect(mongoDB, { useNewUrlParser: true,useUnifiedTopology: true })
.then(() => {
     console.log('DATAbase connected successfuly')
     app.listen(3001)
}) 