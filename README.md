# Books API

A REST API to manage a personal book collection built with Node.js and Express.js.

## Features
- Get all books
- Create a new book
- Update a book
- Delete a book
- Filter books by genre

## Tech Stack
- Node.js
- Express.js

## How to Run
npm install
npm run dev

## API Endpoints
GET    /books            - Get all books
POST   /books            - Create a book
PUT    /books/:id        - Update a book
DELETE /books/:id        - Delete a book
GET    /books?genre=     - Filter by genre
