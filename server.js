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

mongoose.connect(process.env.DB_URL);

//implements express
const app = express();

// Use of CORS
app.use(cors());

// Verifies server is running
console.log('I am alive!');

// DO I NEED THIS?
const { response } = require('express');

// Establishes the server port
const PORT = process.env.PORT || 3002;

// ROUTES
app.get('/', (request, response) => {
  response.status(200).send('Welcome to the Back-End!');
})

app.get('/books', getBooks);

async function getBooks (request, response, next) {
  try {
      let results = await Book.find();
      response.status(200).send(results);
  } catch (error){
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
