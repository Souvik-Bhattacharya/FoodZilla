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
        <div className='w-full h-full p-20 justify-center place-items-center'>
            <div className='flex flex-col items-center'>
                <h1 className='text-5xl text-green-600 p-5'>Account Removed Successfully</h1>
                <h1 className='text-2xl text-blue-500 p-5'>Thank You</h1>
                <Link href={"/"} className='underline text-xl'>Go Back to Home Page</Link>
            </div>
        </div>
    )
}

export default Remove;
