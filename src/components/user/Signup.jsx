"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { setCookie } from 'nookies'
import Link from 'next/link'
import Image from 'next/image'

const Signup = (props) => {
    const [data, setData] = useState({
        name: "",
        email: "",
        contact: "",
        address: "",
        pincode: "",
        district: "",
        state: "",
        country: "",
        password: "",
        image: ""
    })
    const { push } = useRouter();

    const submit = async (e) => {
        e.preventDefault();
        let response = await fetch(`${props.HOST}/api/auth/user/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
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

    const convert = (e) => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setData({ ...data, image: reader.result })
        }
        reader.onerror = (error) => {
            alert(error);
        }
    }

    return (
        <form onSubmit={submit} className='p-10 small:px-0 flex flex-col gap-5 items-center w-full h-screen overflow-auto'>
            <h1 className='p-2 text-xl font-bold text-blue-500 italic'>User Sign Up</h1>
            <div className='flex gap-3 justify-center small:flex-col items-center'>
                <Image src={data.image} alt="" className='rounded-lg' width={240} height={240}/>
                <div className='flex flex-col gap-2 p-5 small:p-2'>
                    <input type="text" name="name" value={data.name} placeholder='User Name' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg micro:w-2/3 self-center' required/>

                    <input type="email" name="email" value={data.email} placeholder='Email Address' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg micro:w-2/3 self-center' required/>

                    <input type="tel" name="contact" value={data.contact} placeholder='Contact Number' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg micro:w-2/3 self-center' required/>

                    <input type="text" name="address" value={data.address} placeholder='Address' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg micro:w-2/3 self-center' required/>

                    <input type="number" name="pincode" value={data.pincode} placeholder='Pincode' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg micro:w-2/3 self-center' required/>

                    <input type="text" name="district" value={data.district} placeholder='District Name' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg micro:w-2/3 self-center' required/>

                    <input type="text" name="state" value={data.state} placeholder='State Name' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg micro:w-2/3 self-center' required/>

                    <input type="text" name="country" value={data.country} placeholder='Country Name' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg micro:w-2/3 self-center' required/>

                    <input type="password" name="password" value={data.password} placeholder='Password' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg micro:w-2/3 self-center' required/>

                    <input type="file" accept='image/*' onChange={convert} className='bg-slate-200 p-2 shadow rounded-lg w-fit micro:w-2/3 self-center' />
                </div>

            </div>
            <button type="submit" className='bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 active:from-cyan-400 active:to-blue-400 hover:shadow-blue-200 hover:shadow-md text-white font-bold p-3 rounded-lg'>Sign Up</button>
            <div className='p-5 text-sm'>Already have an account? <Link href={"/user/login"} className='underline'>Login</Link></div>
        </form>
    )
}

export default Signup;
