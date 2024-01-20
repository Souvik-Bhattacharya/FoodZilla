"use client"
import { parseCookies } from 'nookies'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Remove = (props) => {
    const [data, setData] = useState({ name: "" })

    const remove = async (e) => {
        e.preventDefault()
        const cookies = parseCookies();
        let response = await fetch(`${props.HOST}/api/category/remove`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "admintoken": cookies["admintoken"]
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (result.error) {
            toast.error('Unable to remove category', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            toast.success("Category removed successfully", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const change = (e) => {
        setData({ name: e.target.value })
    }

    return (
        <form onSubmit={remove} className='p-10 small:px-0 flex flex-col gap-3 items-center col-span-3 small:col-span-4 h-full overflow-auto'>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className='flex flex-col'>
                <p className='p-1 text-xl font-bold text-blue-500 italic'>Remove Category</p>
                <hr className='p-1 w-full' />
            </div>

            <input type="text" name="name" value={data.name} placeholder='Category Name' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg w-1/2' required/>

            <button type="submit" className='bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 active:from-cyan-400 active:to-blue-400 hover:shadow-blue-200 hover:shadow-md text-white font-bold p-3 rounded-lg w-1/2'>Remove</button>
        </form>
    )
}

export default Remove
