import Image from "next/image";
import Link from "next/link";
import React from "react";

const getFoods = async () => {
    let response = await fetch(`${process.env.HOST}/api/foods/get`, { cache: 'no-store' });
    return await response.json();
}

const page = async () => {
    const foods = await getFoods();
    return (
        <div className='h-full grid gap-5 text-center p-10 overflow-auto col-span-4 small:col-span-5'>
            <h1 className='text-xl font-bold text-blue-500 italic row-span-1'>Menu</h1>
            <div className='h-full row-span-9 grid grid-cols-[repeat(auto-fit,200px)] gap-5 justify-center'>
                {foods.map((food) => {
                    return (
                        <div key={food._id} className='h-fit flex flex-col items-center hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-200 rounded-xl overflow-hidden'>
                            <p className='border-2 border-blue-100 text-sm sticky opacity-75 p-2 bg-white w-[200px] text-center'>{food.name}</p>
                            <Image src={food.image} alt="" width={200} height={200} className="" />
                            <Link href={`/menu/food/${food._id}`} className='bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 active:from-cyan-400 active:to-blue-400 text-white font-bold p-2 text-base w-full text-center'>₹{food.price}</Link>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}

export default page;
