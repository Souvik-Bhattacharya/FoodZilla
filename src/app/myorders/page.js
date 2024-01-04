import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
// , { next: { revalidate: 1 } }

const getOrders = async () => {
    const cookieStore = cookies()
    const usertoken = cookieStore.get('usertoken')
    let response = await fetch(`http://localhost:3000/api/getorders`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "usertoken": usertoken.value
        }
    });
    let data = await response.json();
    if (data.error) {
        alert("Unable to fetch orders");
    }
    else {
        return data;
    }
}

const page = async () => {
    if(!cookies().has("usertoken")){
        redirect("/login")
    }
    const orders = await getOrders();
    return (
        <div className='p-28 justify-center items-center grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5'>
            {orders.map((food) => {
                return (
                    <div key={food._id} className='p-5 flex gap-3 bg-slate-100 rounded-lg'>
                        <div className='flex flex-col h-32'>
                            <p className='text-base p-1'>{food.name}</p>
                            <p className='p-1 text-xs '>{food.date}</p>
                            <hr className='p-1' />
                            <p className='p-1 text-xs '>Category: {food.category}</p>
                            <p className='p-1 text-xs '>Unit Price: ₹{food.price}</p>
                            <p className='p-1 text-xs '>Quantity: {food.quantity}</p>
                        </div>
                        <div className='h-32 place-items-center'>
                            <div className='p-2 text-lg '>₹{food.amount}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default page
