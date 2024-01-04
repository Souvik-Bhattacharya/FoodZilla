"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { parseCookies } from 'nookies'

const Food = (props) => {
    const food = props.data[0]
    const { push } = useRouter()
    const [quantity, setQuantity] = useState(1)
    const [amount, setamount] = useState(food.price)

    const submit = async (e) => {
        e.preventDefault();
        const cookies = parseCookies();
        if(!cookies["usertoken"]){
            push("/login")
        }
        else{
            const response = await fetch(`${props.HOST}/api/addtocart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application-json",
                    "usertoken": cookies["usertoken"]
                },
                body: JSON.stringify({ "fid": food._id, "quantity": quantity, "amount": amount })
            });
            const data = await response.json();
            if (data.error) {
                alert("Unable to add to your cart")
            }
            else {
                alert("food is sucsessfully added to your cart");
                push("/menu")
            }
        }
    }

    const add = (e) => {
        e.preventDefault()
        setQuantity(quantity + 1);
        setamount(amount + food.price);
    }

    const subtract = (e) => {
        e.preventDefault()
        if (quantity > 1) {
            setQuantity(quantity - 1);
            setamount(amount - food.price);
        }
    }

    return (
        <div className='h-full p-24'>
            <div className='p-10 flex flex-col'>
                <p className='text-2xl p-1'>{food.name}</p>
                <p className='text-base p-1'>Category: {food.category}</p>
                <hr className='w-full' />
                <p className='p-1 text-base'>{food.desc}</p>
                <p className='p-1 text-lg'>Unit Price: ₹{food.price}</p>
                <p className='p-1 text-xl'>Total Price: ₹{amount}</p>
                <hr className='w-full' />
                <form onSubmit={submit} className='flex justify-between items-center gap-3'>
                    <div className='flex p-3 gap-2 w-1/3'>
                        <button className='text-base font-bold p-3 bg-rose-400 rounded-md' onClick={subtract}>-</button>
                        <input type="text" readOnly value={quantity} className='bg-slate-200 p-3 shadow rounded-lg text-base font-bold w-12' />
                        <button className='text-base p-3 bg-green-400 rounded-md' onClick={add}>+</button>
                    </div>
                    <button type="submit" className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold p-3 shadow rounded-md'>Add to Cart</button>
                </form>
            </div>
        </div>
    )
}

export default Food
