'use strict';

// let aBook = {
//     title: 'Hunt For Red October',
//     description: 'A novel about a CIA analyst named Jack Ryan looking for a Russian submarine called Red October that has a silent propulsion drive and attempts to stop World War III from starting.',
//     status: true,
// }

const mongoose = require('mongoose');
const { Schema } = mongoose;
const bookSchema = new Schema ({
    title:{type: String, required: true},
    description:{type: String, required: true},
    status:{type: String, required: true}
});

const bookModel = mongoose.model('Book', bookSchema);

module.exports = bookModel;