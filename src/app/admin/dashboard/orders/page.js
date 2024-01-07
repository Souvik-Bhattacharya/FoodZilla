import React from 'react'
import { cookies } from 'next/headers'
// , { next: { revalidate: 1 } }

const getOrders = async () => {
    const cookieStore = cookies()
    const admintoken = cookieStore.get('admintoken')
    let response = await fetch(`${process.env.HOST}/api/orders/all`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "admintoken": admintoken.value
        }
    });
    let data = await response.json();
    if (data.error) {
        console.log(data.error)
    }
    else {
        return data;
    }
}


const page = async () => {
    const orders = await getOrders();
    return (
        <div className='p-24 col-span-3 h-full grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5'>
            {orders.map((order) => {
                return (
                    <div key={order._id} className='p-5 flex h-fit justify-between bg-slate-100 rounded-lg'>
                        <div className='flex flex-col justify-between'>
                            <p className='text-base p-1'>{order.name}</p>
                            <p className='p-1 text-xs '>Category: {order.category}</p>
                            <hr className='p-1' />
                            <p className='p-1 text-xs '>Unit Price: ₹{order.price}</p>
                            <p className='p-1 text-xs '>Quantity: {order.quantity}</p>
                        </div>
                        <div className='flex flex-col items-end justify-between'>
                            <p className='p-1 text-base '>{order.date}</p>
                            <div className='p-1 text-lg '>₹{order.amount}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default page
