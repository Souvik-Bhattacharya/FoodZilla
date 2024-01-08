import Link from "next/link";
import React from "react";

const getFoods = async () => {
    let response = await fetch(`${process.env.HOST}/api/foods/get`, { next: { revalidate: 1 } });
    return await response.json();
}

const page = async () => {
    const foods = await getFoods();
    return (
        <div className='h-full grid gap-5 text-center p-10 overflow-auto col-span-4'>
            <h1 className='text-xl font-bold text-blue-500 italic row-span-1'>Menu</h1>
            <div className='h-full row-span-9 grid grid-cols-[repeat(auto-fit,220px)] gap-5 justify-center'>
                {foods.map((food) => {
                    return (
                        <div key={food._id} className='h-fit flex flex-col items-center rounded-lg hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-200 rounded-xl overflow-hidden'>
                            <img src={food.image} alt="" width="full" className="" />
                            <p className='text-lg absolute opacity-75 p-2 bg-white w-[220px] text-center'>{food.name}</p>
                            <Link href={`/menu/food/${food._id}`} className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold p-2 text-base w-full text-center'>₹{food.price}</Link>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}

export default page;
