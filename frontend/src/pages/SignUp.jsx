import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function SignUp() {
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });
  const navigate = useNavigate();
  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  }

  const submit = async () => {
    try {
      if (Values.username === "" || Values.email === "" || Values.password === "" || Values.address === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post("/api/v1/sign-up", Values);
        alert(response.data.message);
        navigate('/login');
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  }
  return (
    <div className='h-screen bg-zinc-900 flex items-center justify-center'>
      <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
        <p className='text-zinc-200 text-2xl font-semibold mb-4'>Sign Up</p>

        <div className='mb-4'>
          <label htmlFor="username" className='text-zinc-400 block mb-2'>
            Username
          </label>
          <input
            type="text"
            id="username"
            className='w-full bg-zinc-900 text-zinc-100 p-2 rounded outline-none'
            placeholder='Enter your username'
            value={Values.username}
            onChange={change}
            name='username'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor="email" className='text-zinc-400 block mb-2'>
            Email
          </label>
          <input
            type="email"
            id="email"
            className='w-full bg-zinc-900 text-zinc-100 p-2 rounded outline-none'
            placeholder='xyz@example.com'
            value={Values.email}
            onChange={change}
            name='email'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor="password" className='text-zinc-400 block mb-2'>
            Password
          </label>
          <input
            type="password"
            id="password"
            className='w-full bg-zinc-900 text-zinc-100 p-2 rounded outline-none'
            placeholder='Enter your password'
            value={Values.password}
            onChange={change}
            name='password'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor="address" className='text-zinc-400 block mb-2'>
            Address
          </label>
          <input
            type="text"
            id="address"
            className='w-full bg-zinc-900 text-zinc-100 p-2 rounded outline-none'
            placeholder='Enter your address'
            name='address'
            value={Values.address}
            onChange={change}
            required
          />
        </div>
        <button
          type="submit"
          className='w-full bg-blue-600 text-zinc-100 p-2 rounded mt-4 hover:bg-blue-700 transition duration-200'
          onClick={submit}
        >
          Sign Up
        </button>

        <p className='text-zinc-400 mt-4'>
          Already have an account? <Link to="/login" className='text-blue-500 hover:underline'>Sign In</Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp