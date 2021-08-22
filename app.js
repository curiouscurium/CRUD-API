const express = require('express');

const mongoose = require('mongoose');
const app = express();
require('dotenv/config');

const postsRoute = require('./routes/posts');

app.use('/uploads',express.static('uploads'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/posts',postsRoute)

app.get('/', (req,res) =>{
    res.send('We are at home');
});



mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser: true ,useUnifiedTopology: true,useFindAndModify: false},
    ()=> console.group('Connected to DB')
);


app.listen(3000);