"use client"
import { parseCookies } from 'nookies'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Password = (props) => {
    const [data, setData] = useState({ "password": "" })

    const update = async (e) => {
        e.preventDefault()
        const cookies = parseCookies();
        let response = await fetch(`${props.HOST}/api/auth/user/password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "usertoken": cookies["usertoken"]
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (result.error) {
            toast.error('Unable to update password', {
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
            toast.success("Password updated successfully", {
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
        setData({ password: e.target.value })
    }

    return (
        <form onSubmit={update} className='p-10 small:px-0 flex flex-col gap-3 items-center col-span-3 small:col-span-4 h-full overflow-auto'>
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
                <p className='p-1 text-xl font-bold text-blue-500 italic'>Update Password</p>
                <hr className='p-1 w-full' />
            </div>

            <input type="password" name="password" value={data.password} autoComplete="new-password" required placeholder='Update Password' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg w-1/2'/>

            <button type="submit" className='bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 active:from-cyan-400 active:to-blue-400 hover:shadow-blue-200 hover:shadow-md text-white font-bold p-3 rounded-lg w-1/2'>Update</button>
        </form>
    )
}

export default Password
