"use client"
import Image from 'next/image'
import { parseCookies } from 'nookies'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar'

const Add = (props) => {
    const [data, setData] = useState({ image: "/category.png", name: "" })
    const [progress, setProgress] = useState(0)

    const add = async (e) => {
        e.preventDefault()
        const cookies = parseCookies();
        setProgress(10)
        let response = await fetch(`${props.HOST}/api/category/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "admintoken": cookies["admintoken"]
            },
            body: JSON.stringify(data)
        });
        setProgress(40)
        const result = await response.json();
        setProgress(70)
        if (result.error) {
            toast.error('Unable to add category', {
                position: "top-center",
                autoClose: 5000,
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
            toast.success("Category added successfully", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setProgress(100)
        }
    }

    const change = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const convert = (e) => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setData({ ...data, image: reader.result })
        }
        reader.onerror = (error) => {
            toast.error(`${error}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    return (
        <form onSubmit={add} className='p-10 small:px-0 flex flex-col gap-3 items-center col-span-3 small:col-span-4 h-full overflow-auto '>
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
            <h1 className='p-2 text-xl font-bold text-blue-500 italic'>Add Category</h1>
            <div className='flex gap-5 justify-center items-center small:flex-col'>
                <Image src={data.image} alt="" className='w-[240px] h-[240px] rounded-lg' width={240} height={240} />
                <div className='flex flex-col gap-2 p-5 small:p-2'>

                    <input type="text" name="name" value={data.name} placeholder='Name' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg micro:w-2/3 self-center w-full' required />

                    <input type="file" accept='image/*' onChange={convert} className='bg-slate-200 p-2 shadow rounded-lg w-fit micro:w-2/3 self-center' required />
                </div>
            </div>
            <button type="submit" className='bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 active:from-cyan-400 active:to-blue-400 hover:shadow-blue-200 hover:shadow-md text-white font-bold p-3 rounded-lg w-1/2'>Add</button>
        </form>
    )
}

export default Add
