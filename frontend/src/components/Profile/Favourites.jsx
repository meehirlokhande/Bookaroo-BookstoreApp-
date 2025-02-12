import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BookCard from '../BookCard/BookCard';

function Favourites() {
  const [FavouriteBooks, setFavouriteBooks] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,

  }
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("/api/v1/get-favourite-books", { headers });
      setFavouriteBooks(response.data.data);
    };
    fetch();
  }, []);

  const handleRemoveBook = async (bookid) => {
    try {
      const response = await axios.put(
        "/api/v1/remove-book-from-favourite",
        { bookid },
        { headers: { ...headers, bookid } }
      );
      alert(response.data.message);

      setFavouriteBooks(FavouriteBooks.filter(book => book._id !== bookid));
    } catch (error) {
      console.error("Error removing book from favourites:", error);
    }
  };
  return (
    <div className='grid grid-cols-4 gap-4'>
      {FavouriteBooks && FavouriteBooks.map((item, i) => (
        <div key={i}>
          <BookCard data={item} favourite={true} handleRemoveBook={() => handleRemoveBook(item._id)} />
        </div>
      ))}
    </div>
  );
}

export default Favourites;