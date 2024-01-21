"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { parseCookies } from 'nookies'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCartPlus,
    faHeart
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar'

const Food = (props) => {
    const food = props.data[0]
    const likes = props.likes
    const { push, refresh } = useRouter()
    const [quantity, setQuantity] = useState(1)
    const [amount, setamount] = useState(food.price)
    const [progress, setProgress] = useState(0)

    const submit = async (e) => {
        e.preventDefault();
        const cookies = parseCookies();
        if (!cookies["usertoken"]) {
            push("/user/login")
        }
        else {
            setProgress(10)
            const response = await fetch(`${props.HOST}/api/cart/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application-json",
                    "usertoken": cookies["usertoken"]
                },
                body: JSON.stringify({ image: food.image, name: food.name, price: food.price, quantity: quantity, amount: amount })
            });
            setProgress(40)
            const data = await response.json();
            setProgress(70)
            if (data.error) {
                toast.error('Unable to add to your cart', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setProgress(100)
            }
            else {
                toast.success("Food item is added to cart successfully", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setProgress(100)
                setTimeout(() => { push("/menu") }, 2000)
            }
        }
    }

    const add = (e) => {
        e.preventDefault()
        setProgress(40)
        setQuantity(quantity + 1);
        setProgress(70)
        setamount(amount + food.price);
        setProgress(100)
    }

    const subtract = (e) => {
        e.preventDefault()
        setProgress(10)
        if (quantity > 1) {
            setProgress(40)
            setQuantity(quantity - 1);
            setProgress(70)
            setamount(amount - food.price);
            setProgress(100)
        }
        else{
            setProgress(100)
        }
    }

    const plus = async (fid, like) => {
        const cookies = parseCookies();
        if (!cookies["usertoken"]) {
            push("/user/login")
        }
        else {
            setProgress(10)
            let response1 = await fetch(`${props.HOST}/api/like/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'usertoken': cookies["usertoken"]
                },
                body: JSON.stringify({ fid })
            })
            setProgress(20)
            let msg1 = await response1.json()
            setProgress(30)
            if (msg1.error) {
                toast.error('Unable to add like', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setProgress(100)
            }
            else {
                setProgress(40)
                like = like + 1;
                let response2 = await fetch(`${props.HOST}/api/foods/update`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'usertoken': cookies["usertoken"]
                    },
                    body: JSON.stringify({ fid, like })
                });
                setProgress(50)
                let msg2 = await response2.json()
                setProgress(60)
                if (msg2.error) {
                    toast.error('Unable to update like', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setProgress(100)
                }
                else {
                    setProgress(100)
                    refresh();
                }
            }
        }
    }
    const minus = async (fid, like) => {
        const cookies = parseCookies();
        if (!cookies["usertoken"]) {
            push("/user/login")
        }
        else {
            setProgress(10)
            let response1 = await fetch(`${props.HOST}/api/like/remove`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'usertoken': cookies["usertoken"]
                },
                body: JSON.stringify({ fid })
            })
            setProgress(20)
            let msg1 = await response1.json()
            setProgress(30)
            if (msg1.error) {
                toast.error('Unable to remove like', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setProgress(100)
            }
            else {
                setProgress(40)
                like = like - 1
                let response2 = await fetch(`${props.HOST}/api/foods/update`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'usertoken': cookies["usertoken"]
                    },
                    body: JSON.stringify({ fid, like })
                })
                setProgress(50)
                let msg2 = await response2.json()
                setProgress(60)
                if (msg2.error) {
                    toast.error('Unable to update like', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setProgress(100)
                }
                else {
                    setProgress(100)
                    refresh();
                }
            }
        }
    }

    return (
        <div className='col-span-4 small:col-span-5 gap-2 h-full overflow-auto'>
            <LoadingBar
                color='#3b82f6'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className='flex p-10 mini:flex-col justify-center items-center w-full h-fit'>
                <Image src={food.image} alt="" width={200} height={200} className='rounded-lg w-[200px] h-[200px]' />
                <div className='flex flex-col gap-1 px-3 mini:items-center mini:text-center'>
                    <div className='flex items-center w-full justify-between'>
                        <p className='text-2xl p-1'>{food.name}</p>
                        <div className="flex justify-center gap-1 items-center">
                            {
                                (likes.includes(food._id)) ?
                                    <button onClick={() => { minus(food._id, food.likes) }}>
                                        <FontAwesomeIcon icon={faHeart} size='xl' className="text-rose-500" />
                                    </button>
                                    :
                                    <button onClick={() => { plus(food._id, food.likes) }}>
                                        <FontAwesomeIcon icon={faHeart} size='xl' className="text-blue-500" />
                                    </button>
                            }
                            <p className="text-base">{food.likes}</p>
                        </div>
                    </div>
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
