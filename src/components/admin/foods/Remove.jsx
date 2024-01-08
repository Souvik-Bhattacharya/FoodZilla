"use client"
import { parseCookies } from 'nookies'
import React, { useState } from 'react'

const Remove = (props) => {
    const [data, setData] = useState({ name: "" })

    const remove = async (e) => {
        e.preventDefault()
        const cookies = parseCookies();
        let response = await fetch(`${props.HOST}/api/foods/remove`, {
            method: "DELETE",
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
            alert("Successfully removed food item")
        }
    }

    const change = (e) => {
        setData({ name: e.target.value })
    }

    return (
        <form onSubmit={remove} className='p-20 flex flex-col items-start h-full col-span-3 gap-3'>
            <div className='flex flex-col'>
                <p className='p-1 text-xl font-bold text-blue-500 italic'>Remove Food</p>
                <hr className='p-1 w-full' />
            </div>

            <input type="text" name="name" value={data.name} placeholder='Food Name' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg w-fit' />

            <button type="submit" className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold p-2 shadow rounded-lg'>Remove</button>
        </form>
    )
}

export default Remove
