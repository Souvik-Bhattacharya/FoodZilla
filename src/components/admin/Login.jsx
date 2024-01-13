"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { setCookie } from 'nookies'

const Login = (props) => {
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
        if(token.error){
            alert("Invalid admin Email Address or Password")
        }
        else{
            setCookie(null, "admintoken", token.adminToken, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            })
            push("/menu");
        }
    }

    const change = (e)=>{
        setData({...data, [e.target.name]: e.target.value})
    }

    return (
        <div className='p-10 flex flex-col items-center w-full h-screen overflow-auto'>
            <h1 className='p-5 text-xl font-bold text-blue-500 italic'>Admin Login</h1>
            <div className='p-5'>
                <form onSubmit={submit} className='flex flex-col gap-3'>
                    <div>
                        <input type="email" name="email" value={data.email} placeholder='Email Address' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg' required/>
                    </div>
                    <div>
                        <input type="password" name="password" value={data.password} placeholder='Password' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg' required/>
                    </div>
                    <button type="submit" className='bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 active:from-cyan-400 active:to-blue-400 hover:shadow-blue-200 hover:shadow-md text-white font-bold p-3 rounded-lg'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
