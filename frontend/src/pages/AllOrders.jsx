import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../components/loader/Loader';
import { FaCheck, FaUserLarge } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

function AllOrders() {
    const [AllOrders, setAllOrders] = useState([]);
    const [Options, setOptions] = useState(-1);
    const [selectedStatus, setSelectedStatus] = useState({});
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(
                "/api/v1/get-all-orders",
                { headers }
            );
            setAllOrders(response.data.data);
        };
        fetch();
    }, []);

    const setOptionsButton = (i) => {
        setOptions(i);
    };

    const handleStatusChange = (e, orderId) => {
        setSelectedStatus({ ...selectedStatus, [orderId]: e.target.value });
    };

    const updateStatus = async (orderId) => {
        try {
            const response = await axios.put(
                `/api/v1/update-status/${orderId}`,
                { status: selectedStatus[orderId] },
                { headers }
            );
            alert(response.data.message);
            // Update the status in the local state
            setAllOrders(AllOrders.map(order => order._id === orderId ? { ...order, status: selectedStatus[orderId] } : order));
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    return (
        <div className='bg-zinc-900 text-white min-h-screen px-10 py-8'>
            <h1 className='text-5xl font-semibold text-yellow-100 mb-8'>All Orders</h1>
            <div className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
                <div className='w-[3%]'>
                    <h1 className='text-center'>#</h1>
                </div>
                <div className='w-[40%] md:w-[22%]'>
                    <h1 className=''>Title</h1>
                </div>
                <div className='w-[17%] md:w-[9%]'>
                    <h1 className=''>Description</h1>
                </div>
                <div className='w-[17%] md:w-[9%]'>
                    <h1 className=''>Price</h1>
                </div>
                <div className='w-[30%] md:w-[16%]'>
                    <h1 className=''>Status</h1>
                </div>
                <div className='w-[10%] md:w-[5%]'>
                    <h1 className=''><FaUserLarge /></h1>
                </div>
            </div>
            {AllOrders.map((items, i) => (
                <div key={i} className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer'>
                    <div className='w-[3%]'>
                        <h1 className='text-center'>{i + 1}</h1>
                    </div>
                    <div className='w-[40%] md:w-[22%]'>
                        <Link to={`/view-book-details/${items.book._id}`} className='hover:text-blue-300'>{items.book.title}</Link>
                    </div>
                    <div className='w-[17%] md:w-[9%]'>
                        <p className=''>{items.book.desc.slice(0, 20)}...</p>
                    </div>
                    <div className='w-[17%] md:w-[9%]'>
                        <p className=''>₹{items.book.price}</p>
                    </div>
                    <div className='w-[30%] md:w-[16%]'>
                        <button className='hover:scale-105 transition-all duration-300' onClick={() => setOptionsButton(i)}>
                            {items.status === "Order placed" ? (
                                <div className='text bg-yellow-500'>{items.status}</div>
                            ) : items.status === "Canceled" ? (
                                <div className='text bg-red-500'>{items.status}</div>
                            ) : (
                                <div className='text bg-green-500'>{items.status}</div>
                            )}
                        </button>
                        <div className='flex'>
                            <select
                                name="status"
                                id=""
                                className='bg-gray-800'
                                value={selectedStatus[items._id] || items.status}
                                onChange={(e) => handleStatusChange(e, items._id)}
                            >
                                {[
                                    "Order placed",
                                    "Out for delivery",
                                    "Delivered",
                                    "Canceled",
                                ].map((status, i) => (
                                    <option value={status} key={i}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                            <button
                                className='text-green-500 hover:text-pink-600 mx-2'
                                onClick={() => updateStatus(items._id)}
                            >
                                <FaCheck />
                            </button>
                        </div>
                    </div>
                    <div className='w-[10%] md:w-[5%]'>
                        <p className=''>{items.user.username}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AllOrders;