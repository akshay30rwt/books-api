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

    return res.status(200).json(filteredBooks);
});

app.post('/books', async (req, res) => {
    const { title, author, genre, year } = req.body;
    const book = new Book({ title, author, genre, year });
    await book.save();

    res.status(201).json({
        message: `Book '${title}' added to library`
    });
});

app.put('/books/:id', (req, res) => {
    const { title, genre } = req.body;
    const bookId = Number(req.params.id);
    const index = books.findIndex(book => book.id === bookId);

    if(index === -1) {
        return res.status(404).json({
            message: `Book with ID: ${bookId} not found`
        });
    }

    books[index].title = title;
    books[index].genre = genre;
    
    res.status(200).json({
        message: `ID: ${bookId} | Title: ${title} updated successfully`
    });
});

app.delete('/books/:id', (req, res) => {
    const bookId = Number(req.params.id);
    const index = books.findIndex(book => book.id === bookId);

    if(index === -1) {
        return res.status(404).json({
            message: `Book with ID: ${bookId} not found`
        });
    }
    const deletedBook = books[index];
    books.splice(index, 1);
    res.status(200).json({
        message: `Book Title: ${deletedBook.title} deleted from the library`
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
