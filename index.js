const express = require('express');

const app = express();
app.use(express.json());

const PORT = 3000;

let books = [];
let nextId = 1;

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Contacts API is running'
    });
});

app.get('/books', (req, res) => {
    const { genre } = req.query;

    if(!genre) {
        if(books.length === 0) {
            return res.status(404).json({
                message: 'There are no books here'
            });
        }
        return res.status(200).json(books);
    }

    const filteredBooks = books.filter(book => 
        book.genre.toLowerCase().includes(genre.toLowerCase())
    );
    if(filteredBooks.length === 0) {
        res.status(404).json({
            message: `No ${genre} books in the library`
        });
    }

    res.status(200).json(filteredBooks);
});

app.post('/books', (req, res) => {
    const { title, genre } = req.body;
    const newBook = {
        id: nextId,
        title: title, 
        genre: genre
    }
    nextId++;

    books.push(newBook);
    res.status(201).json({
        message: `Title: '${title}' book added to the library`
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