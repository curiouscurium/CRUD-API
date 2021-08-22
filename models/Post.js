const mongoose = require('mongoose');
const PostSchema = mongoose.Schema({
    
    orderNo :{
        type:Number,
        // required: true
    },
    price: {
        type : Number,
        required : true
    },
    item : {
        type :String,
        required : true
    },
    date : {
        type :Date,
        default : Date.now
    },
    productImage : {
        type : String,
        required:true
    }

});

module.exports = mongoose.model('Posts',PostSchema)