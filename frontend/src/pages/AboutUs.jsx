import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function AboutUs() {
    return (
        <div className='bg-zinc-900 text-white min-h-screen px-10 py-8'>
            <h1 className='text-5xl font-semibold text-yellow-100 mb-8'>About Us</h1>
            <p className='text-xl text-zinc-300 mb-4'>
                Welcome to Bookaroo, your number one source for all things books. We're dedicated to giving you the very best of literature, with a focus on quality, customer service, and uniqueness.
            </p>
            <p className='text-xl text-zinc-300 mb-4'>
                Founded  by Meehir Lokhande , Bookaroo has come a long way from its beginnings in a home office. When Meehir first started out, his passion for "Books with Heart: Old Stories, New Beginnings" drove him to quit his day job, do tons of research, so that Anand-Books can offer you the world's most advanced online bookstore. We now serve customers all over the world and are thrilled that we're able to turn our passion into our own website.
            </p>
            <p className='text-xl text-zinc-300 mb-4'>
                We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
            </p>

            <div className='mt-8 flex flex-col items-center'>
                <img src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png" alt="Meehir Lokhande" className='rounded-full w-32 h-32 mb-4' />
                <h2 className='text-3xl font-semibold text-yellow-100'></h2>
                <p className='text-xl text-zinc-300'>Meehir Lokhande</p>
                <p className='text-xl text-zinc-300'>Bookaroo</p>
                <p className='text-xl text-zinc-300'>Malviya ward khanjapur betul</p>
                <p className='text-xl text-zinc-300'>Phone: +91 7489******</p>
                <p className='text-xl text-zinc-300'>Email: mlokhande616@gmai.com</p>
                <div className='flex mt-4 space-x-4'>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className='text-blue-500 text-2xl'>
                        <FaFacebook />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className='text-blue-400 text-2xl'>
                        <FaTwitter />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className='text-pink-500 text-2xl'>
                        <FaInstagram />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className='text-blue-700 text-2xl'>
                        <FaLinkedin />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;