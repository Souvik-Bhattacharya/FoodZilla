"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const Cart = (props) => {
    let user = props.user;
    let foods = props.cart;
    const { push } = useRouter()
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
            push(data.url)
        }
    }

    return (
        <div className='grid grid-flow-col grid-cols-3 h-screen'>
            <div className='p-20 col-span-2 h-full overflow-auto flex flex-col gap-2'>
                {foods.map((food) => {
                    return (
                        <div key={food._id} className='p-5 flex h-fit justify-between hover:shadow-lg hover:shadow-blue-200 rounded-lg'>
                            <div className='flex gap-1'>
                                <img src={food.image} alt="" className='p-2 rounded-lg bg-slate-100' height={100} width={120} />
                                <div className='flex flex-col items-start justify-between'>
                                    <p className='p-1 text-lg'>{food.name}</p>
                                    <p className='p-1 text-xs '>Unit Price: ₹{food.price}</p>
                                    <p className='p-1 text-xs '>Quantity: {food.quantity}</p>
                                    <p className='p-1 text-lg '>₹{food.amount}</p>
                                </div>
                            </div>
                            <div className='flex flex-col items-center justify-center p-1'>
                                <button onClick={()=>{remove(food._id)}} className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold p-2 shadow-lg shadow-blue-200 rounded-lg'>Remove</button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <form onSubmit={order} className='p-20 flex flex-col gap-3 items-start h-full overflow-auto'>
                <h1 className='p-1 text-xl font-bold text-blue-500 italic'>Profile Info</h1>
                <div className='flex flex-col gap-2'>
                    <input value={user.name} className='bg-slate-200 p-1 rounded-lg' readOnly />

                    <input value={user.email} className='bg-slate-200 p-1 shadow rounded-lg' readOnly />

                    <input value={user.contact} className='bg-slate-200 p-1 shadow rounded-lg' readOnly />

                    <input value={user.address} className='bg-slate-200 p-1 shadow rounded-lg' readOnly />

                    <input value={user.pincode} className='bg-slate-200 p-1 shadow rounded-lg' readOnly />

                    <input value={user.district} className='bg-slate-200 p-1 shadow rounded-lg' readOnly />

                    <input value={user.state} className='bg-slate-200 p-1 shadow rounded-lg' readOnly />

                    <input value={user.country} className='bg-slate-200 p-1 shadow rounded-lg' readOnly />

                </div>
                <div className='flex flex-col gap-1'>
                    <hr className='p-1 w-full' />
                    <p className='p-1 text-base '>Sub-Total: ₹{total}</p>
                    <p className='p-1 text-base '>Service Charge: ₹{10} - in cash</p>
                    <p className='p-1 text-base '>Total: ₹{total + 10}</p>
                </div>
                <button type="submit" className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold p-4 shadow-lg shadow-blue-200 rounded-lg'>Order</button>
            </form>
        </div>
    )
}

export default Cart
