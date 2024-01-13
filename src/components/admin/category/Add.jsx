"use client"
import Image from 'next/image'
import { parseCookies } from 'nookies'
import React, { useState } from 'react'

const Add = (props) => {
    const [data, setData] = useState({ image: "https://cdn.vectorstock.com/i/preview-1x/73/82/food-logo-vector-38377382.jpg", name: "" })

    const add = async (e) => {
        e.preventDefault()
        const cookies = parseCookies();
        let response = await fetch(`${props.HOST}/api/category/add`, {
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
            alert("Successfully added category")
        }
    }

    const change = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const convert = (e)=>{
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = ()=>{
            setData({ ...data, image: reader.result })
        }
        reader.onerror = (error)=>{
            alert(error);
        }
    }

    return (
        <form onSubmit={add} className='p-20 flex flex-col gap-3 items-center col-span-3 h-full overflow-auto'>
            <h1 className='p-2 text-xl font-bold text-blue-500 italic'>Add Category</h1>
            <div className='flex gap-5 justify-center items-center'>
                <Image src={data.image} alt="" className='rounded-lg' width={240} height={240}/>
                <div className='flex flex-col gap-2 p-5'>

                    <input type="text" name="name" value={data.name} placeholder='Name' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg' required/>

                    <input type="file" accept='image/*' onChange={convert} className='bg-slate-200 p-2 shadow rounded-lg w-fit' required/>
                </div>
            </div>
            <button type="submit" className='bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 active:from-cyan-400 active:to-blue-400 hover:shadow-blue-200 hover:shadow-md text-white font-bold p-3 rounded-lg'>Add</button>
        </form>
    )
}

export default Add
