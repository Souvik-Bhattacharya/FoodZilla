"use client"
import React, { useState } from 'react'
import { parseCookies } from 'nookies'

const Edit = (props) => {
    const admin = props.admin
    const [data, setData] = useState({ ...admin, "password": "" })

    const edit = async (e) => {
        e.preventDefault()
        const cookies = parseCookies();
        let response = await fetch(`${props.HOST}/api/auth/admin/edit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "admintoken": cookies["admintoken"]
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (result.error) {
            alert(result.error)
        }
        else {
            alert("Successfully updated admin profile")
        }
    }

    const change = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }


    return (
        <form onSubmit={edit} className='p-24 flex flex-col items-start h-full col-span-3 gap-3'>
            <div className='flex flex-col'>
                <p className='p-1 text-xl font-bold text-blue-500 italic'>Profile</p>
                <hr className='p-1 w-full' />
            </div>

            <input type="text" name="name" value={data.name} placeholder='User Name' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg w-fit' />

            <input type="email" name="email" value={data.email} placeholder='Email Address' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg w-fit' />

            <input type="text" name="password" value={data.password} placeholder='Reset Password' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg w-fit' />

            <button type="submit" className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold p-2 shadow rounded-lg'>Update</button>
        </form>
    )
}

export default Edit
