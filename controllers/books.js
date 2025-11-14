const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// Get all books
const getAll = async (req, res) => {
    try {
        const db = mongodb.getDb().db('libraryDB');
        const lists = await db.collection('books').find().toArray();
        res.status(200).json(lists);
    } catch (err) {
        res.status(500).json({ message: err.toString() });
    }
};

// Get single book
const getSingle = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid book id to find a book.');
        }

        const bookId = new ObjectId(req.params.id);
        const db = mongodb.getDb().db('libraryDB');

        const result = await db.collection('books').findOne({ _id: bookId });

        if (!result) {
            return res.status(404).json('Book not found.');
        }

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.toString() });
    }
};

// Post new book
const createBook = async (req, res) => {
    try {
        const book = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            year: req.body.year,
            pages: req.body.pages,
            language: req.body.language,
            isbn: req.body.isbn
        };

        const db = mongodb.getDb().db('libraryDB');
        const response = await db.collection('books').insertOne(book);

        if (response.acknowledged) {
            res.status(201).json({ id: response.insertedId });
        } else {
            res.status(500).json('Error occurred while creating the book.');
        }
    } catch (err) {
        res.status(500).json({ message: err.toString() });
    }
};

// Update a book
const updateBook = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid book id to update a book.');
        }

        const bookId = new ObjectId(req.params.id);

        const book = {
            title: req.body.title,
            author: req.body.author,
            year: req.body.year,
            genre: req.body.genre,
            pages: req.body.pages,
            ratings: req.body.rating,
            isbn: req.body.isbn,
            available: req.body.available
        };

        const db = mongodb.getDb().db('libraryDB');
        const updateResult = await db.collection('books').replaceOne({ _id: bookId }, book);

        if (updateResult.modifiedCount > 0 || updateResult.matchedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json('Book not found.');
        }
    } catch (err) {
        res.status(500).json({ message: err.toString() });
    }
};

// Delete a book
const deleteBook = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid book id to delete a book.');
        }

        const bookId = new ObjectId(req.params.id);

        const db = mongodb.getDb().db('libraryDB');
        const deleteResult = await db.collection('books').deleteOne({ _id: bookId });

        if (deleteResult.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json('Book not found.');
        }
    } catch (err) {
        res.status(500).json({ message: err.toString() });
    }
};

module.exports = { getAll, getSingle, createBook, updateBook, deleteBook };