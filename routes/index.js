var express = require('express');
var router = express.Router();
const Book = require('../models').Book;

//handler function to wrap each route, the asyncHandler acts a middleware that wraps each of our wrap handlers in a try/catch
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

//Book route, get /books to show the full list of books, created a new variable "books" that uses the await keyword to wait for a promise. Used the findAll method for the Books model to get all the books.
router.get('/books', asyncHandler(async (req, res) =>{ 
  const books = await Book.findAll();
  res.render('index', { books, title: "Books" });
}));

//New Book route to show the create new book form
router.get('/books/new', asyncHandler(async (req, res) =>{
  res.render('new-book', { book: {}, title: "New Books" });
}));

// New Book post route - Posts a new book to the database
router.post('/books/new', asyncHandler(async (req,res) => {
  let book; 
  try {
   book = await Book.create(req.body);
    res.redirect('new-book', + book.id)
  } catch (error) {
    if (error.name === "SequelizeValidationError") { //checking the error
      book = await Book.build(req.body);
      res.render('new-book', { book, errors: error.errors, title:"New Book"})
    } else {
      throw error; // error caught in the asyncHandler's catch block 
    } 
  }

}));

// Book detail route to show book detail form, I usedf findByPk() id of the book to edit using the id route parameter, (req.params.id)
router.get('/books/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  res.render("update-book", { book, title: "Update Book" });
}));

//Update Book Route- updates book info in the database, again i initialized the book variable to await Book.findByPk passing it the req.params.id. The update method is asynchronous and returns a promise, next in the asyncHandler I will await the  fulfilled promise of the updated book instance with the await book.update, inside the update method I passed the updated form date with req.body.
//Once the update happens the app will redirect to the individual book page via book.id
router.post('/books/:id', asyncHandler(async (req, res) => {
  let book; 
  try {
  book = await Book.findByPk(req.params.id);
  if (book) {
  await book.update(req.body);
  res.redirect('update-book' + book.id);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    if(error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      book.id = req.params.id;// make sure correct book gets updated
      res.render("update-book", {book, errors: error.errors, title: "Update Book"})
    }else {
      throw error; 
    }
  }
}));

// Delete Book Route- deletes a book, this can't be undone 
router.post('/books/:id/delete', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  await book.destroy();
  res.redirect('/');
}));


module.exports = router;
