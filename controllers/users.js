const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// Get all users
const getAll = async (req, res) => {
    try {
        const result = await mongodb
            .getDb()
            .db('libraryDB')
            .collection('users')
            .find()
            .toArray();

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single user
const getSingle = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid user id to find a user.');
        }

        const userId = new ObjectId(req.params.id);
        const result = await mongodb
            .getDb()
            .db('libraryDB')
            .collection('users')
            .findOne({ _id: userId });

        if (!result) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Post new user
const createUser = async (req, res) => {
    try {
        const user = {
            name: req.body.name,
            email: req.body.email,
            memberSince: req.body.memberSince,
            favoriteGenre: req.body.favoriteGenre,
            borrowedBooks: req.body.borrowedBooks,
            isActive: req.body.isActive,
            role: req.body.role
        };

        const response = await mongodb
            .getDb()
            .db('libraryDB')
            .collection('users')
            .insertOne(user);

        if (response.acknowledged) {
            return res.status(201).json({ id: response.insertedId });
        }

        res.status(500).json({ message: 'Failed to create user.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a user
const updateUser = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid user id to update a user.');
        }

        const userId = new ObjectId(req.params.id);
        const user = {
            name: req.body.name,
            email: req.body.email,
            memberSince: req.body.memberSince,
            favoriteGenre: req.body.favoriteGenre,
            borrowedBooks: req.body.borrowedBooks,
            isActive: req.body.isActive,
            role: req.body.role
        };

        const response = await mongodb
            .getDb()
            .db('libraryDB')
            .collection('users')
            .replaceOne({ _id: userId }, user);

        if (response.modifiedCount > 0) {
            return res.status(204).send();
        }

        res.status(404).json({ message: 'User not found or no changes made.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid user id to delete a user.');
        }

        const userId = new ObjectId(req.params.id);

        const response = await mongodb
            .getDb()
            .db('libraryDB')
            .collection('users')
            .deleteOne({ _id: userId });

        if (response.deletedCount > 0) {
            return res.status(204).send();
        }

        res.status(404).json({ message: 'User not found.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAll, getSingle, createUser, updateUser, deleteUser };
