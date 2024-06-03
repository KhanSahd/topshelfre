// NodeJS (Express)

const express = require('express');
const app = express();
app.use(express.json());

let books = [];

app.get('/books', (req, res) => {
  res.status(200).json(books);
});

app.get('/books/:id', (req, res) => {
  const book = books.find((book) => book.id === parseInt(req.params.id));
  if (!book) {
    res.status(404).json({ error: 'The book could not be found.' });
  } else {
    res.status(200).json(book);
  }
});

app.post('/books', (req, res) => {
  //   const book = req.body;
  const { id, title, author, published_date, price } = req.body;

  //   Check if all required fields are included
  if (!id || !title || !author || !published_date || !price) {
    res.status(400).send('Please include all required fields');
    return;
  }

  //   Check if the book already exists
  const bookExists = books.find((book) => book.id === id);
  if (bookExists) {
    res.status(400).send('A book with that ID already exists');
    return;
  }
  const book = {
    id: id,
    title: title,
    author: author,
    published_date: published_date,
    price: price,
  };
  books.push(book);
  res.status(201).json(book);
});

app.put('/books/:id', (req, res) => {
  const index = books.findIndex((book) => book.id == parseInt(req.params.id));
  let { title, author, published_date, price } = req.body;
  if (index !== -1) {
    // If the request body does not contain a value for a field, the existing value is used.
    // This also keeps the original id value.
    books[index] = {
      id: books[index].id,
      title: title,
      author: author,
      published_date: published_date,
      price: price,
    };
    res.json(books[index]);
  } else {
    res.status(404).send('Book not found');
  }
});

app.delete('/books/:id', (req, res) => {
  const index = books.findIndex((book) => book.id == parseInt(req.params.id));
  if (index !== -1) {
    const deletedBook = books.splice(index, 1);
    res.status(200).json(deletedBook);
  } else {
    res.status(404).send('Book not found');
  }
});

module.exports = app;
