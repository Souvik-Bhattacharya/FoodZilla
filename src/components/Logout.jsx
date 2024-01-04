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
        <div className='w-full h-full p-28 justify-center place-items-center'>
            <div className='flex flex-col items-center'>
                <h1 className='text-5xl text-green-600 p-5'>Logged Out Successfully</h1>
                <h1 className='text-2xl text-blue-500 p-5'>Visit Us Again</h1>
                <Link href={"/"} className='underline text-xl'>Go Back to Home Page</Link>
            </div>
        </div>
    )
}

export default Logout;
