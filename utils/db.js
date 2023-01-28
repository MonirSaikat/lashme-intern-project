const mongoose = require('mongoose');
mongoose.set('strictQuery', true); 

mongoose.connect(process.env.MONGO_URI, {  })
    .then(() => {
        console.log('DB Connected');
    }).catch((error) => {
        console.log(error.message); 
    }); 