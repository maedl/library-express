const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

let books = [
  new Book('Harry Potter', 'JK Rowling', '514', true, 0),
  new Book('Harry Potter 2', 'JK Rowling', '479', true, 1),
  new Book('Harry Potter 3', 'JK Rowling', '693', true, 2)
];

router.get('/', function(req, res, next) {
  res.json(books);
});

router.get('/:id', function(req, res) {
  let bookId = req.params.id;
  
  res.json(books[bookId]);
})

router.get('/loan/:id', function(req, res) {
  let bookId = req.params.id;
  books[bookId].loanBook();
  res.json(books[bookId]);
})

router.post('/add', function(req, res) {
  console.log(req.body);
  let newTitle = req.body.title;
  let newAuthor = req.body.author;
  let newPages = req.body.pages;
  let newId = books.length;
  let newBook = new Book(newTitle, newAuthor, newPages, true, newId)
  books.push(newBook);
  console.log(books);
  res.json(books);
})
module.exports = router;
