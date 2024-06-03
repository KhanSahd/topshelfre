const request = require('supertest');
const app = require('./NodeJS_');

describe('Test the book store API', () => {
  test('Test POST /books', () => {
    return request(app)
      .post('/books')
      .send({
        id: 1,
        title: 'Book 1',
        author: 'Author 1',
        published_date: '2022-01-01',
        price: 9.99,
      })
      .expect(201);
  });

  test('Test GET /books/1', () => {
    return request(app).get('/books/1').expect(200);
  });

  test('Test PUT /books/1', () => {
    return request(app)
      .put('/books/1')
      .send({
        title: 'Updated Book 1',
        author: 'Updated Author 1',
        published_date: '2022-01-02',
        price: 19.99,
      })
      .expect(200);
  });

  test('Test DELETE /books/1', () => {
    return request(app).delete('/books/1').expect(200);
  });

  test('Test GET /books', () => {
    return request(app).get('/books').expect(200);
  });

  test('Test POST /books with missing fields', () => {
    return request(app)
      .post('/books')
      .send({
        id: 2,
        title: 'Book 2',
        // Missing author, published_date, and price
      })
      .expect(400); // Expecting a 400 Bad Request due to missing fields
  });

  test('Test GET /books/:id for a non-existing book', () => {
    return request(app).get('/books/999').expect(404, { error: 'The book could not be found.' });
  });

  test('Test PUT /books/:id for a non-existing book', () => {
    return request(app)
      .put('/books/999')
      .send({
        title: 'Non-existing Book',
        author: 'Non-existing Author',
        published_date: '2022-01-01',
        price: 9.99,
      })
      .expect(404, 'Book not found');
  });

  test('Test DELETE /books/:id for a non-existing book', () => {
    return request(app).delete('/books/999').expect(404, 'Book not found');
  });

  test('Test POST /books with duplicate ID', () => {
    // First, add a book with a specific ID
    return request(app)
      .post('/books')
      .send({
        id: 3,
        title: 'Book 3',
        author: 'Author 3',
        published_date: '2022-01-03',
        price: 29.99,
      })
      .expect(201)
      .then(() => {
        // Try to add another book with the same ID
        return request(app)
          .post('/books')
          .send({
            id: 3,
            title: 'Duplicate Book 3',
            author: 'Duplicate Author 3',
            published_date: '2022-01-04',
            price: 39.99,
          })
          .expect(400); // Expecting a 400 Bad Request due to duplicate ID
      });
  });
});
