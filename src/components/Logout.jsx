"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { destroyCookie, parseCookies } from 'nookies'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import LoadingBar from 'react-top-loading-bar'

const Logout = () => {
    const [progress, setProgress] = useState(0)
    const { refresh } = useRouter();
    const logout = async () => {
        setProgress(40)
        destroyCookie(null, "usertoken");
        setProgress(70)
        destroyCookie(null, "admintoken");
        setProgress(100)
        if(!cookies["usertoken"]){
            refresh();
        }
    }
    const cookies = parseCookies();
    if (cookies["usertoken"] || cookies["admintoken"]) {
        setProgress(10)
        logout();
    }
    return (
        <div className='w-full h-screen flex p-10 justify-center overflow-auto'>
            <LoadingBar
                color='#3b82f6'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <div className='flex flex-col items-center'>
                <h1 className='text-2xl text-green-600 p-5 text-center'>Logged Out Successfully</h1>
                <Image src="/success.gif" width={200} height={200} alt="" className='w-[200px] h-[200px]' />
                <h1 className='text-xl text-blue-500 p-5 text-center'>Visit Us Again</h1>
                <Link href={"/"} className='underline text-lg text-center'>Go Back to Home Page</Link>
            </div>
        </div>
    )
}

export default Logout;
