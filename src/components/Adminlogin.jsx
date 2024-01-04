"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { setCookie } from 'nookies'

const Adminlogin = (props) => {
    const [data, setData] = useState({"email":"", "password":""})
    const {push} = useRouter();

    const submit = async (e)=>{
        e.preventDefault();
        let response = await fetch(`${props.HOST}/api/auth/admin/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: data.email, password: data.password})
        });
        const token = await response.json();
        setCookie(null, "admintoken", token.adminToken, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
        })
        push("/menu");
    }

    const change = (e)=>{
        setData({...data, [e.target.name]: e.target.value})
    }

    return (
        <div className='p-10 flex flex-col justify-center items-center w-full'>
            <h1 className='p-5'>Admin Login</h1>
            <div className='p-5'>
                <form onSubmit={submit} className='flex flex-col gap-3'>
                    <div>
                        <input type="email" name="email" value={data.email} placeholder='Email Address' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg'/>
                    </div>
                    <div>
                        <input type="password" name="password" value={data.password} placeholder='Password' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg'/>
                    </div>
                    <button type="submit" className='bg-orange-300 p-2 shadow rounded-lg'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Adminlogin
