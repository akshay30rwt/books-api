# Library Books API

A REST API to manage library books built with Node.js, Express.js and MongoDB.

## Features
- Add a new book
- Get all books
- Get a book by ID
- Update a book
- Delete a book
- Filter books by genre

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose

## How to Run
npm install
npm run dev

## API Endpoints
- POST   /books        - Add a book
- GET    /books        - Get all books
- GET    /books/:id    - Get a book by ID
- PUT    /books/:id    - Update a book
- DELETE /books/:id    - Delete a book
- GET    /books?genre= - Filter by genre