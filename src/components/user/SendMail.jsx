"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SendMail = (props) => {
    const [data, setData] = useState({ "email": "" })

    const submit = async (e) => {
        e.preventDefault();
        let response = await fetch(`${props.HOST}/api/auth/user/send`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: data.email })
        });
        const msg = await response.json();
        if (msg.error) {
            toast.error('Invalid email', {
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
            toast.success("Email send successfully", {
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
        setData({ ...data, [e.target.name]: e.target.value })
    }

    return (
        <div className='p-10 small:px-0 flex flex-col items-center w-full h-screen overflow-auto'>
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
            <h1 className='p-5 text-xl font-bold text-blue-500 italic'>Reset Password</h1>
            <div className='p-5'>
                <form onSubmit={submit} className='flex flex-col gap-3'>
                    <div>
                        <input type="email" name="email" value={data.email} placeholder='Email Address' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg' required />
                    </div>
                    <button type="submit" className='bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 active:from-cyan-400 active:to-blue-400 hover:shadow-blue-200 hover:shadow-md text-white font-bold p-3 rounded-lg'>Send</button>
                </form>
            </div>
            <div className='p-5 text-sm'>Don&apos;t have an account? <Link href={"/user/signup"} className='underline'>Sign Up</Link></div>
        </div>
    )
}

export default SendMail