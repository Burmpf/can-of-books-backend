'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Book = require('./models/book.js');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

// connect Mongoose to our mongodb
mongoose.connect(process.env.DB_URL);

//implements express
const app = express();

// Use of CORS
app.use(cors());

//must have to receive json data from a request
app.use(express.json());

// Verifies server is running
console.log('I am alive!');

// DO I NEED THIS?
const { response } = require('express');

// Establishes the server port
const PORT = process.env.PORT || 3001;

// ROUTES
app.get('/', (request, response) => {
  response.status(200).send('Welcome to the Back-End!');
})

app.get('/books', getBooks);
app.post('/books', postBooks);
app.delete('/books/:id', deleteBooks);
app.put('/books/:id', putBooks);
//path parameter - a variable that we declare in the path
// EX URL:
// http://localhost:3001/books/k6s54f6as51f6as8ef4
// I can access the value k6s54f6as51f6as8ef4 with 'req.params.id'

//:id sets a variable in the path and can be accessed with req.params.id

async function getBooks(request, response, next) {
  try {
    let results = await Book.find();
    response.status(200).send(results);
  } catch (error) {
    next(error);
  }
}


/* 
for a query 
http://localhost:3001/cat?color=orange
to access orange
req.query.color

*/

async function postBooks(req, res, next) {
  try {
    console.log(req.body);
    //we need the book back from the db with the id and version # (createdBook)
    let createdBook = await Book.create(req.body);
    res.send(createdBook);
  } catch (error) {
    next(error);
  }
}

async function deleteBooks(req, res, next) {
  try {
    //get the ID of the book we want to delete:
    console.log(req.params.id);

    // make a request to the database to delete the cat in question
    // do not assume you will get a response
    await Book.findByIdAndDelete(req.params.id);
    res.send('book deleted');
  } catch (error) {
    next(error)
  }
}


async function putBooks(req, res, next) {
  try {
    let id = req.params.id;
    // json data comes in the req.body
    let updatedBookData = req.body;

    // findByIdAndUpdate() takes 3 parameters
    // - 1. the ID of the thing in the database to update
    // - 2. the updated data object
    // - 3. options object (please replace the entire thing in the database with this new thing)
    let updatedBook = await Book.findByIdAndUpdate(id, updatedBookData, { new: true, overwrites: true });
    res.status(200).send(updatedBook);

  } catch (error) {
    next(error);
  }
}

app.get('*', (request, response) => {
  response.status(404).send('Not Available');
})

//ERROR
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
