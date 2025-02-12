import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaGripLines } from "react-icons/fa";
import { useSelector } from 'react-redux';
function Navbar() {
    const links = [
        {
            title: "Home",
            link: "/"
        },
        {
            title: "About Us",
            link: "/about-us"
        },
        {
            title: "All Books",
            link: "/all-books"
        },
        {
            title: "Cart",
            link: "/cart"
        },
        {
            title: "Profile",
            link: "/profile"
        },
        {
            title: "Admin Profile",
            link: "/profile"
        },
    ];
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);
    if (isLoggedIn == false) {
        links.splice(3, 3);
    }
    if (isLoggedIn == true && role === "user") {
        links.splice(5, 1);
    }
    if (isLoggedIn == true && role === "admin") {
        links.splice(4, 1);
    }
    const [MobileNav, setMobileNav] = useState("hidden");
    return (
        <>
            <nav className='relative bg-zinc-800 z-50 flex text-white px-8 py-4 items-center justify-between'>
                <Link to='/' className='flex items-center '>
                    <img className='h-10 me-4' src="/logo.png" alt="logo" />
                    <h1 className='text-2xl font-semibold'>Bookaroo</h1>
                </Link>
                <div className='nav-links-bookheaven block md:flex items-center gap-4 ' >
                    <div className='hidden md:flex gap-4 items-center justify-center'>
                        {links.map((items, i) => (
                            <>
                                {items.title === "Profile" || items.title === "Admin Profile" ? <Link to={items.link}
                                    className='px-2 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 '
                                    key={i}
                                >
                                    {items.title}
                                </Link> : <Link to={items.link}
                                    className='hover:text-blue-500 transition-all duration-300'
                                    key={i}
                                >
                                    {items.title}{" "}
                                </Link>}
                            </>
                        ))}
                    </div>
                    {isLoggedIn === false && (
                        <>
                            <div className='hidden md:flex gap-4'>
                                <Link to="/login" className='px-2 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>Login</Link>
                                <Link to="/signup" className='px-2 py-1 bg-blue-500 rounded  hover:bg-white hover:text-zinc-800 transition-all duration-300'>SignUp</Link>
                            </div>
                        </>
                    )}
                    <button className='block md:hidden text-white text-2xl hover:text-zinc-400' onClick={() => MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden")}>
                        <FaGripLines />
                    </button>
                </div>
            </nav>
            <div className={`${MobileNav} bg-zin-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>

                {links.map((items, i) => (
                    <Link to={items.link}
                        className={`${MobileNav} hover:text-blue-500 transition-all duration-300 mb-8 text-white text-4xl font-semibold`}
                        key={i}
                        onClick={() => MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden")}
                    >
                        {items.title}{" "}
                    </Link>
                ))}
                {isLoggedIn === false && (
                    <>
                        <Link to="/login" className={`${MobileNav} px-8 mb-8 text-3xl font-semibold py-2 border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300`}>Login</Link>
                        <Link to="/signup" className={`${MobileNav} px-8 mb-8 py-2 text-3xl font-semibold bg-blue-500 rounded  hover:bg-white hover:text-zinc-800 transition-all duration-300`}>SignUp</Link>
                    </>
                )}
            </div>
        </>
    )
}
// https://cdn-icons-png.flaticon.com/128/10433/10433049.png
export default Navbar