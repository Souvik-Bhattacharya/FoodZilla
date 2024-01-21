"use client"
import Link from 'next/link'
import React from 'react'
import { destroyCookie, parseCookies } from 'nookies'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Remove = (props) => {
    const { refresh } = useRouter();
    const cookies = parseCookies();

    const logout = async () => {
        const usertoken = cookies["usertoken"]
        destroyCookie(null, "usertoken");
        refresh()
        const response = await fetch(`${props.HOST}/api/auth/user/remove`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "usertoken": usertoken
            }
        })
        const data = await response.json()
        if (data.error) {
            toast.error(`Unable to remove user account`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            refresh();
        }
    }

    if (cookies["usertoken"]) {
        logout();
    }

    return (
        <div className='w-full h-screen flex p-20 justify-center items-center overflow-auto'>
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
            <div className='flex flex-col items-center'>
                <h1 className='text-3xl text-green-600 p-5'>Account Removed Successfully</h1>
                <Image src="/success.gif" width={200} height={200} alt="" className='w-[200px] h-[200px]' />
                <h1 className='text-xl text-blue-500 p-5'>Thank You</h1>
                <Link href={"/"} className='underline text-lg'>Go Back to Home Page</Link>
            </div>
        </div>
    )
}

export default Remove;
