const mongoose = require('mongoose')
 

const newSchema = mongoose.Schema({

    name : {
        type:String,
        required : true,

    },
    email :{
        type :String,

    },
    password :{
        type : String,
        minlength :6,

    },
    phone :{
        type : Number,
        maxlength :10
    }
})

const User =mongoose.model('User',newSchema)
module.exports= User;