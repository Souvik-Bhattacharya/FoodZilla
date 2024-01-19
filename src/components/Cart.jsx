"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faTrash
} from "@fortawesome/free-solid-svg-icons";

const Cart = (props) => {
    let user = props.user;
    let foods = props.cart;
    const { push, refresh } = useRouter()
    let total = 0
    foods.forEach(food => {
        total = total + food.amount
    });

    const remove = async (cid) => {
        let response = await fetch(`${props.HOST}/api/cart/remove?id=${cid}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        if (data.error) {
            alert("Unable to remove food item")
        }
        else {
            alert("food item is successfully deleted");
            refresh();
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
            push(data.url)
        }
    }

    return (
        <div className='grid grid-flow-col h-screen small:flex small:flex-col small:h-fit'>
            {
                (foods.length != 0) ?
                    <div className='p-20 small:p-10 h-full overflow-auto flex flex-col gap-2'>
                        {foods.map((food) => {
                            return (
                                <div key={food._id} className='p-5 mini:p-2 flex h-fit justify-between items-center hover:shadow-lg hover:shadow-blue-200 rounded-lg mini:flex-col'>
                                    <div className='flex gap-1 items-center'>
                                        <Image src={food.image} alt="" className='p-2 rounded-lg bg-slate-100 w-[100px] h-[100px]' height={100} width={100} />
                                        <div className='flex flex-col items-start justify-between'>
                                            <p className='p-1 text-lg mini:text-base micro:text-sm'>{food.name}</p>
                                            <p className='p-1 text-xs'>Unit Price: ₹{food.price}</p>
                                            <p className='p-1 text-xs'>Quantity: {food.quantity}</p>
                                            <p className='p-1 text-lg mini:text-base micro:text-sm'>₹{food.amount}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col items-center justify-center p-1'>
                                        <button onClick={() => { remove(food._id) }} className='bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 active:from-cyan-400 active:to-blue-400 text-white font-bold p-3 hover:shadow-md hover:shadow-blue-200 rounded-lg'><FontAwesomeIcon icon={faTrash} size="xl" style={{ color: "#ffffff", }} /></button>
                                    </div>
                                </div>
                            )
                        })}
                    </div> :
                    <div className="h-full flex justify-center p-20">
                        <p>Your Cart Is Empty!</p>
                    </div>
            }
            <form onSubmit={order} className='p-20 small:p-10 flex flex-col gap-3 items-start h-full overflow-auto'>
                <div className='p-1 text-xl font-bold text-blue-500 italic self-center'>Profile Info</div>
                <div className='flex flex-col gap-2 w-full'>
                    <input value={user.name} className='bg-slate-200 p-1 rounded-lg' readOnly />

                    <input value={user.email} className='bg-slate-200 p-1 shadow rounded-lg' readOnly />

                    <input value={user.contact} className='bg-slate-200 p-1 shadow rounded-lg' readOnly />

                    <input value={user.address} className='bg-slate-200 p-1 shadow rounded-lg' readOnly />

                    <input value={user.pincode} className='bg-slate-200 p-1 shadow rounded-lg' readOnly />

                    <input value={user.district} className='bg-slate-200 p-1 shadow rounded-lg' readOnly />

                    <input value={user.state} className='bg-slate-200 p-1 shadow rounded-lg' readOnly />

                    <input value={user.country} className='bg-slate-200 p-1 shadow rounded-lg' readOnly />

                </div>
                <div className='flex items-center justify-between w-full mini:flex-col'>
                    <div className='flex flex-col gap-1 mini:text-center'>
                        <p className='p-1 text-base '>Sub-Total: ₹{total}</p>
                        <p className='p-1 text-base '>Service Charge: ₹{10} - in cash</p>
                        <p className='p-1 text-base '>Total: ₹{total + 10}</p>
                    </div>
                    <button type="submit" className='bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 active:from-cyan-400 active:to-blue-400 text-white font-bold p-3 hover:shadow-md hover:shadow-blue-200 rounded-lg'>Order</button>
                </div>
            </form>
        </div>
    )
}

export default Cart
