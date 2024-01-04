"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { setCookie } from 'nookies'
import Link from 'next/link'

const Signup = (props) => {
    const [data, setData] = useState({ "name": "", "email": "", "password": "" })
    const { push } = useRouter();

    const submit = async (e) => {
        e.preventDefault();
        let response = await fetch(`${props.HOST}/api/auth/user/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: data.name, email: data.email, password: data.password })
        });
        const token = await response.json();
        if (token.error) {
            alert("User with same email id already exist");
        }
        else {
            setCookie(null, "usertoken", token.userToken, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            })
            alert("Successfully signed up");
            push("/menu");
        }
    }

    const change = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    return (
        <div className='p-10 flex flex-col justify-center items-center w-full h-full'>
            <h1 className='p-5 text-xl font-bold text-blue-500 italic'>User Sign Up</h1>
            <div className='p-5'>
                <form onSubmit={submit} className='flex flex-col gap-3'>
                    <div>
                        <input type="text" name="name" value={data.name} placeholder='User Name' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg' />
                    </div>
                    <div>
                        <input type="email" name="email" value={data.email} placeholder='Email Address' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg' />
                    </div>
                    <div>
                        <input type="password" name="password" value={data.password} placeholder='Password' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg' />
                    </div>
                    <button type="submit" className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold p-2 shadow rounded-lg'>Sign Up</button>
                </form>
            </div>
            <div className='p-5 text-sm'>Already have an account? <Link href={"/login"} className='underline'>Login</Link></div>
        </div>
    )
}

export default Signup;
