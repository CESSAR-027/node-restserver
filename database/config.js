 const mongoose = require('mongoose');
 
 const conexionDB = async() => {

try {
  await mongoose.connect( process.env.MONGODB_CX, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false

  });

  console.log('BASE DE DATOS ONLINE');

} catch (error) {
    console.log(error);
    throw new Error('Error a la hora de levantar la base de datos');
}


 }



 module.exports = {
    conexionDB
 }