import React, { useEffect, useState } from 'react'
import Loader from '../loader/Loader';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function ViewBookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Data, setData] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`/api/v1/get-book-by-id/${id}`);
      setData(response.data.data);
    };
    fetch();
  }, [])
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id
  }
  const handleFavourite = async () => {
    const response = await axios.put("/api/v1/add-book-to-favourite", {}, { headers });
    alert(response.data.message);
  }

  const handleCart = async () => {
    const response = await axios.put("/api/v1/add-book-to-cart", {}, { headers });
    alert(response.data.message);

  }

  const deleteBook = async () => {
    const response = await axios.delete("/api/v1/delete-book", { headers });
    alert(response.data.message);
    navigate("/all-books")
  }
  return (
    <>
      {Data && <div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8'>
        <div className='bg-zinc-800 rounded  p-12 h-[60vh] lg:h-[88vh] w-full lg:w-3/6 flex   justify-around '><img src={Data.url} alt="/" className='h-[30vh] lg:h-[70vh] rounded' />
          {isLoggedIn === true && role === "user" && <div className='flex flex-col md:flex-row lg:flex-col mt-4 lg:mt-0'>
            <button className='bg-white lg:rounded-full text-3xl text-red-500 p-2 flex items-center justify-center gap-1' onClick={handleFavourite}><FaHeart /><span className='ms-1 block lg:hidden'>Add to favourites</span></button>
            <button className='bg-white lg:rounded-full text-3xl text-blue-500 p-2 mt-4 flex items-center justify-center ' onClick={handleCart}><FaCartShopping /><span className='ms-4 block lg:hidden'>Add to cart</span></button>
          </div>}
          {isLoggedIn === true && role === "admin" && <div className='flex flex-col md:flex-row lg:flex-col mt-4 lg:mt-0'>
            <Link to={`/updateBook/${id}`} className='bg-white lg:rounded-full text-3xl text-red-500 p-2 flex items-center justify-center gap-1'><FaEdit /><span className='ms-1 block lg:hidden'>Edit</span></Link>
            <button className='bg-white lg:rounded-full text-3xl text-blue-500 p-2 mt-4 flex items-center justify-center ' onClick={deleteBook}><MdDelete /><span className='ms-4 block lg:hidden'>Delete Book</span></button>
          </div>}
        </div>
        <div className='p-4 w-3/6'>
          <h1 className='text-4xl text-zinc-300 font-semibold'>{Data.title}</h1>
          <p className='text-zinc-400 mt-1'>{Data.author}</p>
          <p className='text-zinc-500 mt-4'>{Data.desc}</p>
          <p className='flex items-center justify-start text-zinc-400 mt-4'>
            <GrLanguage className='me-3' /> {Data.language}
          </p>
          <p className='mt-4 text-zinc-100 text-3xl font-semibold'>
            Price : ₹ {Data.price}{" "}
          </p>
        </div>
      </div>}
      {!Data && <div className='h-screen bg-zinc-900 flex items-center justify-center'><Loader />{" "}</div>}
    </>
  )
}

export default ViewBookDetails