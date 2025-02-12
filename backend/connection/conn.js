const mongoose = require('mongoose');

const conn = async() =>{
    try{
        await mongoose.connect(`${process.env.URI}`);
        console.log('Succesfully connected to database');
    }
    catch(err){
        console.log(err);
    }
};

conn();