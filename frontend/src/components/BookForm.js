import React, { useEffect, useState } from 'react';
import { createBook, updateBook } from '../api/bookApi';

const BookForm = ({ book, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    year: ''
  });

  useEffect(() => {
    if (book) {
      setFormData(book);
    }
  }, [book]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const payload = {...formData, year: Number(formData.year)};
  if (book) {
    await updateBook(book.id, payload);
  } else {
    await createBook(payload);
  }
  setFormData({title:'',author:'',description:'',year:''});
  onSubmit();
};


  return (
    <form className='container' onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
      <input name="author" placeholder="Author" value={formData.author} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
      <input name="year" placeholder="Year" value={formData.year} onChange={handleChange} required type="number"/>
      <button  className='addbtn' type="submit">{book ? "Update Book" : "Add Book"}</button>
    </form>
  );
};

export default BookForm;
