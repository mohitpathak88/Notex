const express = require('express');
const mongoose = require('mongoose');       //To use mongoose object we created here
const blogRoutes = require('./routes/blogRoutes');


const app = express();


//Connecting with database:
const dbURI = 'mongodb+srv://netninja:test1234@nodetuts.5rtw2.mongodb.net/node-tuts?retryWrites=true&w=majority';
//Link for connecting with mongodb database
mongoose.connect(dbURI)     // { useNewUrlParser: true, useUnifiedTopology: true} Put this as the second argument along with dbURI incase 
//there occurs a deprecationWarning
    .then((result) => console.log('connected to db'))       //It executes when the database is connected
    .catch((err) => console.log(err));      //Incase there are any errors with the connection



app.set('view engine','ejs')        //register view engines
//.set sets ejs as the view engine

app.listen(3000);   //listen for requests


//Middleware for static files:
app.use(express.static('public'));      //Any folder within apostrophe is made public for the whole project and can be accessed by frontend 
app.use(express.urlencoded({ extended: true }));    //"urlencoded" takes all the url encoded data that comes along and it passes into an object
// for it to be used here


//app.set('views', 'myviews');    //To set default view engines folder from "views" to any other folder like "myviews"

/* Using Express:
(creating get handlers:)
app.get('/', (req, res) => {
    res.sendFile('./.vscode/views/index.html', { root: __dirname});
     //.send method automatically sets the content type header, hence no need to specify the header content type
});

app.get('/about-us', (req, res) => {
    res.sendFile('./.vscode/views/about.html', { root: __dirname});
    //dirname implies the root location of the project where the the views folder is in
});  

app.use((req, res) => {
    res.status(404).sendFile('./.vscode/views/404.html', { root: __dirname});
});
*/

//Using ejs :
/*
app.get('/add-blog', (req, res) => {        //To add a block
    const blog = new Blog({             //New instance of blog
      title: 'new blog',    
      snippet: 'about my new blog',
      body: 'more about my new blog'
    })
  
    blog.save()         //Saves the new instance of blog
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });       //We need access to the data that comes from create.js after submitting. Hence we need a middleware which will parse the
      // incoming data into a workable format
});
*/ 
/*
app.get('/all-blogs', (req, res) => {       //To retrieve all blogs. Not creating new instance here cause we dont want a new blog
    Blog.find()         //Adding method to the blog model
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
});
*/

app.get('/', (req, res) => {
   // res.render('index', { title: 'Home', blogs: blogs });        //No ejs extension required for index file. Express automatically looks
    // in the views folder during rendering.... Second parameter is an object which is passed to title.ejs as dynamic data
    res.redirect('/blogs');     //redirecting to blogs page.
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'});
});

app.use(blogRoutes)     //To apply all our blog routes here in the main model
  
app.use((req, res) => {         //.use handles every incoming request which are not included by above get handlers
    res.status(404).render('404', { title: '404'});
});


