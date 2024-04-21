var express = require('express');
var router = express.Router();
const Book = require('../models').Book;

//handler function to wrap each route
function asyncHandler(cb) {
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      res.status(500).send(error);
    }
  }
}

/* GET home page. */
router.get('/', asyncHandler(async (req, res) => {
  // commented out the given code (res.render('index', { title: 'Express' });) to redirect to the books route 
  res.redirect('/books');
}));

//Book route 
router.get('/books', asyncHandler(async (req, res) =>{ 
  const books = await Book.findAll();
  res.render('/books/show', { books: {}, title: "Books" });
}));


module.exports = router;
