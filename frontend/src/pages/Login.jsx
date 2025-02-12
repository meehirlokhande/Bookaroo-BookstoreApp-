import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authActions } from '../store/auth';
import { useDispatch } from 'react-redux';
function Login() {
  const [Values, setValues] = useState({
    username: "",

    password: "",

  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  }

  const submit = async () => {
    try {
      if (Values.username === "" || Values.password === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post("/api/v1/sign-in", Values);
        console.log(response);
        console.log(response.data);
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response?.data?.role));
        localStorage.setItem("id", response?.data?.id);
        localStorage.setItem("token", response?.data?.token);
        localStorage.setItem("role", response?.data?.role);
        navigate('/profile');
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  }


  return (
    <div className='h-screen bg-zinc-900 flex items-center justify-center'>
      <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
        <p className='text-zinc-200 text-2xl font-semibold mb-4'>Sign In</p>

        <div className='mb-4'>
          <label htmlFor="username" className='text-zinc-400 block mb-2'>
            Username
          </label>
          <input
            type="text"
            id="username"
            className='w-full bg-zinc-900 text-zinc-100 p-2 rounded outline-none'
            placeholder='Enter your username'
            name='username'
            value={Values.username}
            onChange={change}
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
            name='password'
            className='w-full bg-zinc-900 text-zinc-100 p-2 rounded outline-none'
            placeholder='Enter your password'
            onChange={change}
            value={Values.password}
            required
          />
        </div>
        <button
          type="submit"
          className='w-full bg-blue-600 text-zinc-100 p-2 rounded mt-4 hover:bg-blue-700 transition duration-200'
          onClick={submit}
        >
          Sign In
        </button>

        <p className='text-zinc-400 mt-4'>
          Don't have an account? <Link to="/signup" className='text-blue-500 hover:underline'>Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login