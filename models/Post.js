const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    item : {
        type :String,
        required : true
    },
    price: {
        type : Number,
        required : true
    },
    date : {
        type :Date,
        default : Date.now
    }

});

module.exports = mongoose.model('Posts',PostSchema)