const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/book');

const app = express();
app.use(express.json());

const PORT = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/bookdb').then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Connection failed', err);
});

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Books API is running'
    });
});

app.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        const { genre } = req.query;
        
        if(!genre) {
            if(books.length === 0) {
                return res.status(404).json({
                    message: 'There are no books in library'
                });
            }
            return res.status(200).json(books);
        }

        const filteredBooks = books.filter(book =>
            book.genre.toLowerCase().includes(genre.toLowerCase())
        );

        if(filteredBooks.length === 0) {
            return res.status(404).json({
                message: `No ${genre} genre books in library`
            });
        }

        res.status(200).json(filteredBooks);

    } catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
});

app.get('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findById(id);
        if(!book) {
            return res.status(404).json({
                message: `Book with ID: ${id} not found`
            });
        }

        res.status(200).json(book);
    }
    catch(error) {
        if(error.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid ID'
            });
        }
        res.status(500).json({
            message: error.message
        });
    }
});

app.post('/books', async (req, res) => {
    try {
        const { title, author, genre, year } = req.body;
        const book = new Book({ title, author, genre, year });
        await book.save();

        res.status(201).json({
            message: `Book '${title}' added to library`
        });

    } catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
});

app.put('/books/:id', async (req, res) => {
    try {
        const { title, author, genre, year } = req.body;
        const { id } = req.params;

        const updatedBook = await Book.findByIdAndUpdate(id, { title, author, genre, year }, { new: true });
        if(!updatedBook) {
            return res.status(404).json({
                message: `Book with ID: ${id} not found`
            });
        }

        res.status(200).json({
            message: `ID: ${updatedBook.id} | Title: '${updatedBook.title}', updated successfully`
        });

    } catch(error) {
        if(error.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid ID'
            });
        }
        res.status(500).json({
            message: error.message
        });
    }
});

app.delete('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBook = await Book.findByIdAndDelete(id);
        if(!deletedBook) {
            return res.status(404).json({
                message: `Invalid ID: ${id}`
            });
        }

        res.status(200).json({
            message: 'Book deleted from library',
            deletedBook
        });

    } catch(error) {
        if(error.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid ID'
            });
        }
        res.status(500).json({
            message: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
