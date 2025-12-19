import React, { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../api/bookApi';
import BookForm from './BookForm';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [editBook, setEditBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const data = await getBooks();
    setBooks(data);
  };

  const handleDelete = async (id) => {
    await deleteBook(id);
    setBooks(books.filter(book => book.id !== id));
  };

  const handleEdit = (book) => {
    setEditBook(book);
  };

  const handleFormSubmit = () => {
    setEditBook(null);
    fetchBooks();
  };

  return (
    <div>
      <h2 className='title'>Book Store</h2>
      <BookForm book={editBook} onSubmit={handleFormSubmit} />
      {books.map(book => (
        <div className='bookForm' key={book.id} >
              <div className="book-details">
          <h3>{book.title}</h3>
          <p><b>Author:</b> {book.author}</p>
            <p><b>Year:</b>  {book.year}</p>
          <p><b>Description:</b> {book.description}</p>
          </div>
              <div className="book-actions">
          <button  className='updatebtn' onClick={() => handleEdit(book)}>Update</button>
          <button  className='deletebtn' onClick={() => handleDelete(book.id)}>Delete</button>
        </div>
      </div>
      ))}
    </div>
  );
};

export default BookList;
