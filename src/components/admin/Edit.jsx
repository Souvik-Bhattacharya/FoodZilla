"use client"
import React, { useState } from 'react'
import { parseCookies } from 'nookies'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Edit = (props) => {
    const admin = props.admin
    const [data, setData] = useState({ ...admin, "password": "" })
    const { refresh } = useRouter()

    const edit = async (e) => {
        e.preventDefault()
        const cookies = parseCookies();
        let response = await fetch(`${props.HOST}/api/auth/admin/edit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "admintoken": cookies["admintoken"]
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (result.error) {
            toast.error('Unable to update profile', {
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
        else {
            toast.success("Profile updated successfully", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            refresh();
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
        <form onSubmit={edit} className='p-10 small:px-0 flex flex-col gap-3 items-center col-span-3 small:col-span-4 h-full overflow-auto'>
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
            <h1 className='p-2 text-xl font-bold text-blue-500 italic'>Update Profile</h1>
            <div className='flex gap-5 justify-center items-center small:flex-col'>
                <Image src={data.image} alt="" className='w-[240px] h-[240px] rounded-lg hover:shadow-lg hover:shadow-blue-200' width={240} height={240} />
                <div className='flex flex-col gap-2 p-5 small:p-2'>
                    <input type="text" name="name" value={data.name} placeholder='User Name' onChange={change} className='bg-slate-200 p-2 rounded-lg micro:w-2/3 self-center w-full' />

                    <input type="email" name="email" value={data.email} placeholder='Email Address' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg micro:w-2/3 self-center w-full' />

                    <input type="tel" name="contact" value={data.contact} placeholder='Contact Number' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg micro:w-2/3 self-center w-full' />

                    <input type="text" name="address" value={data.address} placeholder='Address' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg micro:w-2/3 self-center w-full' />

                    <input type="number" name="pincode" value={data.pincode} placeholder='Pincode' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg micro:w-2/3 self-center w-full' />

                    <input type="text" name="district" value={data.district} placeholder='District Name' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg micro:w-2/3 self-center w-full' />

                    <input type="text" name="state" value={data.state} placeholder='State Name' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg micro:w-2/3 self-center w-full' />

                    <input type="text" name="country" value={data.country} placeholder='Country Name' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg micro:w-2/3 self-center w-full' />

                    <input type="password" name="password" value={data.password} placeholder='Update Password' onChange={change} className='bg-slate-200 p-2 shadow rounded-lg micro:w-2/3 self-center w-full' required />

                    <input type="file" accept='image/*' onChange={convert} className='bg-slate-200 p-2 shadow rounded-lg w-fit micro:w-2/3 self-center' />
                </div>

            </div>
            <button type="submit" className='bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 active:from-cyan-400 active:to-blue-400 hover:shadow-blue-200 hover:shadow-md text-white font-bold p-3 rounded-lg w-1/2'>Update</button>
        </form>
    )
}

export default Edit
