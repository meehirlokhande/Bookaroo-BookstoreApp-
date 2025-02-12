import React from 'react'
import { Link } from 'react-router-dom'
function Hero() {
  return (
    <div className='h-[75vh] flex flex-col md:flex-row items-center justify-center'>
        <div className='w-full mb-12 md:mb-0 lg:w-3/6 flex flex-col items-center lg:items-start justify-center'>
        <h1 className='text-3xl lg:text-5xl font-semibold text-yellow-100 text-center lg:text-left'>Books with Heart: Old Stories, New Beginnings!</h1>
        <p className='my-8 text-xl text-zinc-300'>   
         दिल से किताबें: पुरानी कहानियां, नई शुरुआत ....
        </p>
           <div className='mt-8'>
           <Link to='/all-books' className='text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 px-10 py-3 hover:bg-zinc-700 rounded-full'>Discover Books</Link>
           </div>
        </div>
        <div className='w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center'>
            <img src="https://images.unsplash.com/photo-1517393435090-3ec2cce47400?q=80&w=1784&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='rounded ' />
        </div>
    </div>
  )
}

export default Hero