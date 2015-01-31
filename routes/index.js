var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Posts = mongoose.model('posts');


/* GET home page. */
router.get('/', function(req, res) {
    //res.render('index', { title: 'Express' });
    Posts.find({}, function(err, docs){
        res.render('index', {title: 'Blog Posts', posts: docs});
    });
});

router.get('/new', function(req, res) {
    res.render('new', { title: 'New Blog Post' });
});

router.post('/new', function(req, res) {
    console.log(req.body.title);
    new Posts({
        title: req.body.title,
        content: req.body.content
    }).save(function(err, newPost){
            return res.redirect('/');
        });
});

router.get('/:id', function(req, res) {
    Posts.findById(req.params.id, function(err, doc){
        res.render('blogpost', {blogpost: doc});
    });
});




/*
 // Test to see if '/users' would go here or to '/' in users.js
 // Finding: It goes here
 router.get('/users', function(req, res) {
 res.render('index', { title: 'Express Users from index.js' });
 });
 */

module.exports = router;
