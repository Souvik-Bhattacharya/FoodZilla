import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const getOrders = async () => {
    const cookieStore = cookies()
    const usertoken = cookieStore.get('usertoken')
    let response = await fetch(`${process.env.HOST}/api/orders/get`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "usertoken": usertoken.value
        }
    }, { next: { revalidate: 1 } });
    let data = await response.json();
    if (data.error) {
        console.log(data.error);
    }
    else {
        return data;
    }
}

const page = async () => {
    if (!cookies().has("usertoken")) {
        redirect("/user/login")
    }
    const orders = await getOrders();
    return (
        <div className='h-screen grid gap-5 text-center p-20 overflow-auto'>
            <h1 className='text-xl font-bold text-blue-500 italic row-span-1'>My Orders</h1>
            <div className='h-full row-span-9 grid grid-cols-[repeat(auto-fill,520px)] justify-center gap-5'>
                {orders.map((order) => {
                    return (
                        <div key={order._id} className='flex hover:shadow-lg hover:shadow-blue-200 rounded-lg border-2 border-slate-200'>
                            <img src={order.image} alt="" className='rounded-large' width={220}/>
                            <div className='flex flex-col p-2 items-start justify-between'>
                                <p className='text-sm p-1'>{order.name}</p>
                                <p className='p-1 text-xs '>{order.date}</p>
                                <p className='text-xs p-1'>Order Id: {order._id}</p>
                                <p className='p-1 text-xs '>Unit Price: ₹{order.price}</p>
                                <p className='p-1 text-xs '>Quantity: {order.quantity}</p>
                                <p className='p-1 text-xs '>Total Amount: ₹{order.amount}</p>
                                <p className='p-1 text-xs '>{order.user}</p>
                                <p className='p-1 text-xs '></p>
                                <p className='p-1 text-xs '>{order.address}, {order.pincode}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default page
