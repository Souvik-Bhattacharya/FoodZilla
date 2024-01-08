"use client"
import Link from 'next/link'
import React from 'react'
import { destroyCookie } from 'nookies'

const logout = () => {
    destroyCookie(null, "usertoken");
}

const Remove = () => {
    logout();
    return (
        <div className='w-full h-screen flex p-20 justify-center items-center'>
            <div className='flex flex-col items-center'>
                <h1 className='text-3xl text-green-600 p-5'>Account Removed Successfully</h1>
                <h1 className='text-xl text-blue-500 p-5'>Thank You</h1>
                <Link href={"/"} className='underline text-lg'>Go Back to Home Page</Link>
            </div>
        </div>
    )
}

export default Remove;
