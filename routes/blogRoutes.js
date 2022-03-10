//This will contain all the blog routes

const express = require('express');
const router = express.Router();    //Creating new instance of the router object
const Blog = require('../models/blog');    //Importing so that we can access database in this file. ".." means to comeout of the current folder
//const blogController = require('../Controllers/blogController');      //To import blogcontroller if needed


// Hence in this file we can attach the request handlers with the router:

router.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })         //'Blog.find' finds all of the documents inside the blog's collection. '.sort' sorts the blogs,
  // createdAt is the timestamp used in blogjs and -1 is sorting in descending order
    .then(result => {  //when we get the results i.e. blogs, we want to pass them into the index view and index view already has a functionality
  //which handles the incoming blogs. 
      res.render('index', {title: 'All blogs', blogs: result});      //We pass data i.e. 'title' and 'blogs' cause we expect the data in head.js
    })
    .catch(err => {
      console.log(err);
    });
}); 

router.post('/blogs', (req, res) => {
    // console.log(req.body);       //.body contains all the information that we need from the web form
    const blog = new Blog(req.body);        //Creating a new instance for the blog, so that we can save the data in the database
    //req.body passes the data into new instance
  
    blog.save()     //To save it to the database
      .then((result) => {       //So we can take the results here
        res.redirect('/blogs');     // After the user "submit" the data, it gets redirected to the blogs page
      })
      .catch(err => {
        console.log(err);
      });
  });

router.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new Blog' });
})
//ORDER OF HANDLERS MATTERS. If we write 'blogs/create' route at last, the blogRoutes would consider "create" as an id and would go to 'blogs/:id'


//Linking above function through controller:
//router.get('/blogs/create', blogController.blog_create_get);    //Here we simply set the route to create page to the function made in 
//controller so that 'blogRoutes' file looks more neater


//To extract parameter from the route handler in url
router.get('/blogs/:id', (req, res) => {
    const id = req.params.id;       //Extracting the id
    Blog.findById(id)       //To extract the the blog by id through the database
      .then(result => {
        res.render('details', { blog: result, title: 'Blog Details' });     //From the results we got, we want to render a details page and then
        // passing the data we get
      })
      .catch(err => {
        res.status(404).render('404', { title: 'Blog not found'});    //If the id doesnt matches in the database, it will return 404!
      });
  });


//Handling the delete request. When we click on delete, it sends a request to the server, the server deletes it based on id, sends json as a response to details.js 
router.delete('/blogs/:id', (req, res) => {        
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
      .then(result => { 
        res.json({ redirect: '/blogs' });       //Sending back some json to frontend. As there is an ajax request in front part (details.js), 
        //we cannot redirect the page so instead we send json data back to browser. 
      })
      .catch(err => {
        console.log(err);
      });
  });

module.exports = router;      //Exporting router



