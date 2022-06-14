//This will contain all the blog routes

const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');


router.get('/notes', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', {title: 'All Notes', notes: result});
    })
    .catch(err => {
      console.log(err);
    });
}); 

router.post('/notes', (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
      .then((result) => {
        res.redirect('/notes');
      })
      .catch(err => {
        console.log(err);
      });
  });

router.get('/notes/create', (req, res) => {
    res.render('create', { title: 'Create a new Blog' });
})



//To extract parameter from the route handler in url
router.get('/notes/:id', (req, res) => {
    const id = req.params.id;       //Extracting the id

    Blog.findById(id)
      .then(result => {
        res.render('details', { blog: result, title: 'Blog Details' });
      })
      .catch(err => {
        res.status(404).render('404', { title: 'Blog not found'});
      });
  });
 
router.delete('/notes/:id', (req, res) => {        
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
      .then(result => { 
        res.json({ redirect: '/notes' });       //Sending back some json to frontend. As there is an ajax request in front part (details.js), 
        //we cannot redirect the page so instead we send json data back to browser. 
      })
      .catch(err => {
        console.log(err);
      });
  });

module.exports = router;



