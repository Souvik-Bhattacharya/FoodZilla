"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { parseCookies } from 'nookies'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCartPlus
} from "@fortawesome/free-solid-svg-icons";

const Food = (props) => {
    const food = props.data[0]
    const { push } = useRouter()
    const [quantity, setQuantity] = useState(1)
    const [amount, setamount] = useState(food.price)

    const submit = async (e) => {
        e.preventDefault();
        const cookies = parseCookies();
        if (!cookies["usertoken"]) {
            push("/user/login")
        }
        else {
            const response = await fetch(`${props.HOST}/api/cart/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application-json",
                    "usertoken": cookies["usertoken"]
                },
                body: JSON.stringify({ image: food.image, name: food.name, price: food.price, quantity: quantity, amount: amount })
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
        <div className='col-span-4 small:col-span-5 gap-2 h-full overflow-auto'>
            <div className='flex p-10 mini:flex-col justify-center items-center w-full h-fit'>
                <Image src={food.image} alt="" width={200} height={200} className='rounded-lg w-[200px] h-[200px]' />
                <div className='flex flex-col gap-1 px-2 mini:items-center mini:text-center'>
                    <p className='text-2xl p-1'>{food.name}</p>
                    <p className='text-base p-1'>Category: {food.category}</p>
                    <hr className='w-full' />
                    <p className='p-1 text-base'>{food.desc}</p>
                    <p className='p-1 text-base'>Unit Price: ₹{food.price}</p>
                    <form onSubmit={submit} className='flex justify-between items-center mini:flex-col'>
                        <div className='flex p-1 bg-slate-200 rounded-lg'>
                            <button className='text-base font-bold p-2 rounded-md hover:shadow' onClick={subtract}>-</button>
                            <input type="text" readOnly value={quantity} className='bg-slate-200 p-2 shadow rounded-md text-base font-bold w-12 text-center' />
                            <button className='text-base p-2 rounded-md hover:shadow' onClick={add}>+</button>
                        </div>
                        <p className='p-1 text-base'>Total Price: ₹{amount}</p>
                        <button type="submit" className='bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 active:from-cyan-400 active:to-blue-400 text-white font-bold p-3 rounded-lg hover:shadow-md hover:shadow-blue-100'><FontAwesomeIcon icon={faCartPlus} size="xl" style={{ color: "#ffffff", }} /></button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Food
