const mongoose = require('mongoose')
/*
const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect('mongodb+srv://EmUser:EmUser12358@emcluster.uyp4fts.mongodb.net/userapp?retryWrites=true&w=majority')


    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB
*/


const databaseName = 'appProjectGroup2';
const database_url = process.env.DB_URL || "mongodb://localhost:27017"

mongoose.set('strictQuery', false)
mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
 // .connect(`mongodb://mongo:S9uwkMKj8KUI9V4rCATo@containers-us-west-27.railway.app:6238`)
  //.connect(`mongodb://0.0.0.0:27017/${databaseName}`)
  .connect(`${database_url}/${databaseName}`)

  

  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });
