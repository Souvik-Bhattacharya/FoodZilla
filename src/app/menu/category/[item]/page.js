import Link from 'next/link';
import React from 'react'

const getFoods = async (item) => {
    let response = await fetch(`${process.env.HOST}/api/foods/get?category=${item}`, { next: { revalidate: 1 } });
    return await response.json();
}

const page = async ({ params }) => {
    const foods = await getFoods(params.item);
    return (
        <div className='h-full grid gap-5 text-center p-20 overflow-auto col-span-4'>
            <h1 className='text-xl font-bold text-blue-500 italic'>{params.item}</h1>
            <div className='h-full row-span-9 grid grid-cols-[repeat(auto-fit,220px)] gap-5 justify-center'>
                {foods.map((food) => {
                    return (
                        <div key={food._id} className='h-fit flex flex-col items-center rounded-lg gap-1 hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-200 border-slate-100 border-2'>
                            <img src={food.image} alt="" width="full" className="rounded-lg" />
                            <p className='text-lg pt-1'>{food.name}</p>
                            <Link href={`/menu/food/${food._id}`} className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold p-2 shadow rounded-lg text-base w-full text-center'>₹{food.price}</Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default page
