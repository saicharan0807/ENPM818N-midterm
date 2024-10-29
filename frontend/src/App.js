import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    axios.get('http://ab1d7405d11cd4e99a23e0fe1523abad-1903538529.us-east-2.elb.amazonaws.com/books').then(response => setBooks(response.data));
  }, []);

  const addBook = () => {
    axios.post('http://ab1d7405d11cd4e99a23e0fe1523abad-1903538529.us-east-2.elb.amazonaws.com/books', { title, author }).then(response => setBooks([...books, response.data]));
    setTitle('');
    setAuthor('');
  };

  return (
    <div>
      <h1>Bookstore</h1>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <input value={author} onChange={e => setAuthor(e.target.value)} placeholder="Author" />
      <button onClick={addBook}>Add Book</button>
      <ul>
        {books.map(book => (
          <li key={book._id}>{book.title} by {book.author}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;