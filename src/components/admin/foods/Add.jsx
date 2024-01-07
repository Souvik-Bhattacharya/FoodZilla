"use client"
import { parseCookies } from 'nookies'
import React, { useState } from 'react'

const Add = (props) => {
    const [data, setData] = useState({ image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjL0RDH1SAkW4BLqJ7Lc4Koh60aL0bTDWYlQ&usqp=CAU", category: "", name: "", desc: "", price: "", likes: "" })

    const add = async (e) => {
        e.preventDefault()
        const cookies = parseCookies();
        let response = await fetch(`${props.HOST}/api/foods/add`, {
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
            alert("Successfully added food item")
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
        <form onSubmit={add} className='p-20 flex flex-col gap-3 items-center col-span-3 h-full overflow-scroll'>
            <h1 className='p-2 text-xl font-bold text-blue-500 italic'>Add Food</h1>
            <div className='flex gap-5 justify-center items-center'>
                <img src={data.image} alt="" className='rounded-lg' width={240} height={240}/>
                <div className='flex flex-col gap-2 p-5'>
                    <input type="text" name="category" value={data.category} placeholder='Category' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg' />

                    <input type="text" name="name" value={data.name} placeholder='Name' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg' />

                    <input type="text" name="desc" value={data.desc} placeholder='Description' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg' />

                    <input type="number" name="price" value={data.price} placeholder='Price' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg' />

                    <input type="number" name="likes" value={data.likes} placeholder='Likes' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg' />

                    <input type="file" accept='image/*' onChange={convert} className='bg-slate-200 p-2 shadow rounded-lg w-fit' />
                </div>

            </div>
            <button type="submit" className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold p-2 shadow rounded-lg'>Add</button>
        </form>
    )
}

export default Add
