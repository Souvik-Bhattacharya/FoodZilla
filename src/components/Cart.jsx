"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { parseCookies } from 'nookies'

const Cart = (props) => {
    const cookies = parseCookies();
    let user = props.user[0];
    let foods = props.foodItems;
    const { push } = useRouter()
    let total = 0
    foods.forEach(food => {
        total = total + food.amount
    });

    const remove = async (cid) => {
        let response = await fetch(`${props.HOST}/api/removecartitem?id=${cid}`);
        const data = await response.json();
        if (data.error) {
            alert("Unable to remove food item")
        }
        else {
            alert("food item is successfully deleted");
            push("/cart");;
        }
    }

    const order = async (e) => {
        e.preventDefault();
        const response = await fetch(`${props.HOST}/api/payment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                items: foods
            })
        })
        const data = await response.json();
        if (data.error) {
            alert(`Error: ${data.error}`)
        }
        else {
            if (data.url === `${props.HOST}/payment/success`) {
                for (let food of foods) {
                    let response = await fetch(`${process.env.HOST}/api/addorder`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "usertoken": cookies["usertoken"]
                        },
                        body: JSON.stringify(food)
                    })
                    let data = await response.json();
                    if (data.error) {
                        alert(`Error: ${data.error}`);
                        break;
                    }
                }
                let res = await fetch(`${props.HOST}/api/removecart`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "usertoken": cookies["usertoken"]
                    }
                })
                let err = await res.json();
                if (err.error) {
                    alert(`Error: ${err.error}`);
                }
                else {
                    push(data.url);
                }
            }
            else {
                push(data.url);
            }
        }
    }

    return (
        <div className='grid grid-flow-col grid-cols-3 gap-2 p-28'>
            <div className='grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3 col-span-2 justify-center items-center'>
                {foods.map((food) => {
                    return (
                        <div key={food.cid} className='p-5 flex gap-3 bg-slate-100 rounded-lg'>
                            <div className='flex flex-col'>
                                <p className='text-base p-1'>{food.name}</p>
                                <hr className='p-1 w-full' />
                                <p className='p-1 text-xs '>Category: {food.category}</p>
                                <p className='p-1 text-xs '>Unit Price: ₹{food.price}</p>
                                <p className='p-1 text-xs '>Quantity: {food.quantity}</p>
                                <div className='p-1  text-xl place-items-center'><p>₹{food.amount}</p></div>
                                <button onClick={() => { remove(food.cid) }} className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold p-2 shadow rounded-lg'>Remove</button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='p-5 flex flex-col items-center'>
                <form onSubmit={order} className='flex flex-col gap-3'>
                    <div className='flex flex-col text-center'>
                        <p className='p-1 text-xl font-bold text-blue-500 italic'>Info</p>
                        <hr className='p-1 w-full' />
                    </div>
                    <div className='justify-center'>
                        <input type="text" name="name" value={user.name} placeholder='User Name' readOnly className='bg-slate-200 p-2 shadow rounded-lg w-full' />
                    </div>
                    <div className='justify-center'>
                        <input type="email" name="email" value={user.email} placeholder='Email Address' readOnly className='bg-slate-200 p-2 shadow rounded-lg w-full' />
                    </div>
                    <div className='flex flex-col '>
                        <hr className='p-1 w-full' />
                        <p className='p-1 text-base '>Sub-Total: ₹{total}</p>
                        <p className='p-1 text-base '>Service Charge: ₹{10} to be paid in-hand</p>
                        <p className='p-1 text-base '>Total: ₹{total + 10}</p>
                    </div>
                    <button type="submit" className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold p-2 shadow rounded-lg'>Order</button>
                </form>
            </div>
        </div>
    )
}

export default Cart
