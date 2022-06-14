const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');


const app = express();


//Connecting with database:
const dbURI = 'mongodb+srv://netninja:test1234@nodetuts.5rtw2.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI) 
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err));



app.set('view engine','ejs')
app.listen(3000);


//Middleware:
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.redirect('/notes');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'});
});

app.use(blogRoutes)     //To apply all our blog routes here in the main model
  
app.use((req, res) => {         //.use handles every incoming request which are not included by above get handlers
    res.status(404).render('404', { title: '404'});
});


