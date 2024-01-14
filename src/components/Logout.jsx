"use client"
import Link from 'next/link'
import React from 'react'
import { destroyCookie } from 'nookies'

const logout = () => {
    destroyCookie(null, "usertoken");
    destroyCookie(null, "admintoken");
}

const Logout = () => {
    logout();
    return (
        <div className='w-full h-screen flex p-10 justify-center overflow-auto'>
            <div className='flex flex-col items-center'>
                <h1 className='text-2xl text-green-600 p-5 text-center'>Logged Out Successfully</h1>
                <h1 className='text-xl text-blue-500 p-5 text-center'>Visit Us Again</h1>
                <Link href={"/"} className='underline text-lg text-center'>Go Back to Home Page</Link>
            </div>
        </div>
    )
}

export default Logout;
