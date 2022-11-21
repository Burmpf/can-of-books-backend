'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/book.js');
mongoose.connect(process.env.DB_URL);

async function seed() {
    await Book.create({
        title: 'Hunt For Red October',
        description: 'A novel about a CIA analyst named Jack Ryan looking for a Russian submarine called Red October that has a silent propulsion drive and attempts to stop World War III from starting.',
        status: true
    })
    console.log('Hunt For Red... was just added to the d/b!');

    await Book.create({
        title: 'Permanent Record',
        description: 'Edward Snowden risked everything to expose the US government surveillance of citizen data.',
        status: true
    })
    console.log('A second book was just added to our database!');

    await Book.create({
        title: 'Pain Killer, A Memoir of Big League Addiction',
        description: 'An autobiography of NHL player Brantt Mhyers and the story of his addition and path to recovery.',
        status: true
    })
    console.log('A third and final book was just added to the database!');
    
    // close the connection to the d/b
    mongoose.disconnect();
}

seed();