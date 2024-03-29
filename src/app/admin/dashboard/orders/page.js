import React from 'react'
import { cookies } from 'next/headers'
import Image from 'next/image'

const getOrders = async () => {
    const cookieStore = cookies()
    const admintoken = cookieStore.get('admintoken')
    let response = await fetch(`${process.env.HOST}/api/orders/all`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "admintoken": admintoken.value
        }
    }, { cache: 'no-store' });
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
        <>
            (orders.length != 0) ?
            <div className='p-10 small:px-0 col-span-3 small:col-span-4 h-full overflow-auto flex flex-col gap-5'>
                {orders.map((order) => {
                    return (
                        <div key={order._id} className='p-5 small:flex-col small:items-center flex h-fit justify-between hover:shadow-lg hover:shadow-blue-200 rounded-lg'>
                            <div className='flex gap-1 small:flex-col small:items-center'>
                                <Image src={order.image} alt="" className='p-2 rounded-lg bg-slate-100' height={150} width={150} />
                                <div className='flex flex-col items-start small:items-center small:text-center justify-between'>
                                    <p className='text-base p-1'>{order.name}</p>
                                    <p className='text-xs p-1'>Order Id: {order._id}</p>
                                    <hr className='p-1 w-full' />
                                    <p className='p-1 text-xs '>Unit Price: ₹{order.price}</p>
                                    <p className='p-1 text-xs '>Quantity: {order.quantity}</p>
                                </div>
                            </div>
                            <div className='lex flex-col text-end items-end small:items-center small:text-center justify-between'>
                                <p className='p-1 text-base '>{order.date}</p>
                                <p className='p-1 text-xs '>{order.user}</p>
                                <p className='p-1 text-xs '>{order.address} - {order.pincode}</p>
                                <p className='p-1 text-lg '>₹{order.amount}</p>
                            </div>
                        </div>
                    )
                })}
            </div> :
            <div className="h-full flex justify-center col-span-3 small:col-span-4 p-10">
                <p>No Previous Order Is Found!</p>
            </div>
        </>
    )
}

export default page
