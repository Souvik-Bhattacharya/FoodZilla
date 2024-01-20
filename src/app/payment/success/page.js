import Link from 'next/link'
import React from 'react'
import { cookies } from 'next/headers'
import Image from 'next/image'

const getCart = async () => {
    const cookieStore = cookies()
    const usertoken = cookieStore.get('usertoken')
    let response = await fetch(`${process.env.HOST}/api/cart/get`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "usertoken": usertoken.value
        }
    });
    let data = await response.json();
    if (data.error) {
        console.log(data.error);
    }
    else {
        return data;
    }
}

const getUser = async () => {
    const cookieStore = cookies()
    const usertoken = cookieStore.get('usertoken')
    let response = await fetch(`${process.env.HOST}/api/auth/user/get`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "usertoken": usertoken.value
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

const addOrders = async (foods, user) => {
    const cookieStore = cookies()
    const usertoken = cookieStore.get('usertoken')
    for (let food of foods) {
        let response = await fetch(`${process.env.HOST}/api/orders/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "usertoken": usertoken.value
            },
            body: JSON.stringify({
                user: user.name,
                address: user.address,
                pincode: user.pincode,
                image: food.image,
                name: food.name,
                price: food.price,
                quantity: food.quantity,
                amount: food.amount
            })
        })
        let data = await response.json();
        if (data.error) {
            console.log(data.error)
            break;
        }
    }
}

const removeCart = async () => {
    const cookieStore = cookies()
    const usertoken = cookieStore.get('usertoken')
    let response = await fetch(`${process.env.HOST}/api/cart/remove`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "usertoken": usertoken.value
        }
    })
    let data = await response.json();
    if (data.error) {
        console.log(data.error)
    }
}

const page = async () => {
    let cart = await getCart();
    let user = await getUser();
    await addOrders(cart, user);
    await removeCart();
    return (
        <div className='w-full h-screen flex p-10 justify-center overflow-auto'>
            <div className='flex flex-col items-center'>
                <h1 className='text-2xl text-green-600 p-5 text-center'>Payment Successful</h1>
                <Image src="/success.gif" width={200} height={200} alt="" className='w-[200px] h-[200px]' />
                <h1 className='text-lg text-blue-500 p-5 text-center'>Your order will be delivered shortly</h1>
                <Link href={"/orders"} className='underline text-base text-center'>Go Back to My Orders Page</Link>
            </div>
        </div>
    )
}

export default page;
