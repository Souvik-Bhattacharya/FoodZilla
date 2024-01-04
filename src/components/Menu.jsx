"use client"
import Link from 'next/link'
import React from 'react'

const Menu = (props) => {
    return (
        <div className='p-28 justify-center items-center grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5 col-span-3 '>
            {props.data.map((food) => {
                return (
                    <div key={food._id} className='p-5 flex flex-col items-center bg-slate-100 rounded-lg gap-1'>
                        <p className='text-lg p-1'>{food.name}</p>
                        <p className='text-sm p-1'>Category: {food.category}</p>
                        <hr className='w-full'/>
                        <p className='p-1 text-sm'>{food.desc}</p>
                        <p className='p-1 text-sm'>Price: ₹{food.price}</p>
                        <Link href={`/menu/food/${food._id}`} className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold p-2 shadow rounded-lg text-base'>Order Now</Link>
                    </div>
                )
            })}
        </div>
    )
}

export default Menu
