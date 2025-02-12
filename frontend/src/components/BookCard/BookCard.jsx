import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';

function BookCard({ data, favourite, handleRemoveBook }) {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,


  };
  // const handleRemoveBook = async()=>{
  //   const response = await axios.put(
  //     "/api/v1 /remove-book-from-favourite",
  //     {bookid: data._id },
  //     {headers}
  //   );
  //   alert(response.data.message);
  // }
  return (
    <div className='bg-zinc-800 p-4 flex flex-col hover:border border-zinc-300 duration-50'>
      <Link to={`/view-book-details/${data._id}`}>
        <div className=''>
          <div className='bg-zinc-900 rounded flex items-center justify-center'>
            <img src={data.url} alt="" className='h-[35vh]' />
          </div>
          <h2 className='mt-4 text-xl text-zinc-200 font-semibold'>{data.title}</h2>
          <p className='mt-2 text-zinc-400 font-semibold'>by {data.author}</p>
          <p className='mt-2 text-zinc-400 font-semibold text-xl'>₹ {data.price}</p>
        </div>
      </Link>
      {favourite && (
        <button className='bg-yellow-50 px-4 py-3 rounded border border-yellow-500 text-yellow-500 mt-4 ' onClick={handleRemoveBook}>Remove from favourite</button>
      )}
    </div>
  );
};

export default BookCard;