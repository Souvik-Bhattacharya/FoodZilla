'use client'
import React from 'react'
import Link from 'next/link'
import Image from "next/image";
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faGreaterThan,
    faLessThan
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = (props) => {
    const pathname = usePathname()
    const user = props.user
    const open = () => {
        document.getElementById('cat').style.display = 'flex'
        document.getElementById('close').style.display = 'block'
        document.getElementById('open').style.display = 'none'
        document.getElementById('main').style.height = '100%'
    }
    const close = () => {
        document.getElementById('cat').style.display = 'none'
        document.getElementById('close').style.display = 'none'
        document.getElementById('open').style.display = 'block'
        document.getElementById('main').style.height = 'fit-content'
    }
    return (
        <div id='main' className='flex flex-col h-fit w-fit shadow-inner overflow-x-hidden overflow-y-auto small:absolute small:z-10 small:bg-slate-100'>
            <FontAwesomeIcon id='open' icon={faGreaterThan} className='text-blue-500 cursor-pointer hidden small:block p-2' onClick={open} />
            <FontAwesomeIcon id='close' icon={faLessThan} className='text-blue-500 cursor-pointer hidden self-end p-3' onClick={close} />
            <div id='cat' className='flex flex-col items-start p-10 small:pt-0 gap-3 h-fit w-fit small:w-[50vw] small:hidden'>
                <Image src={user.image} alt="" height={50} width={50} className="rounded-full ring-2 ring-blue-500 w-[50px] h-[50px]" />
                <h1 className="text-blue-500 text-xl font-bold italic small:text-xs">{user.email}</h1>
                <hr className='w-full ' />
                <Link href={"/user/dashboard/profile"} className={`hover:text-blue-500 block hover:border-r-blue-500 hover:border-r-2 mini:text-sm micro:text-xs ${pathname === '/user/dashboard/profile' ? 'text-blue-500 border-r-2 border-blue-500' : ''} w-full`}>My Profile</Link>
                <Link href={"/user/dashboard/update"} className={`hover:text-blue-500 block hover:border-r-blue-500 hover:border-r-2 mini:text-sm micro:text-xs ${pathname === '/user/dashboard/update' ? 'text-blue-500 border-r-2 border-blue-500' : ''} w-full`}>Update Password</Link>
                <Link href={"/user/dashboard/orders"} className={`hover:text-blue-500 block hover:border-r-blue-500 hover:border-r-2 mini:text-sm micro:text-xs ${pathname === '/user/dashboard/orders' ? 'text-blue-500 border-r-2 border-blue-500' : ''} w-full`}>My Orders</Link>
                <Link href={"/user/remove"} className={`hover:text-rose-500 block hover:border-r-rose-500 hover:border-r-2 mini:text-sm micro:text-xs ${pathname === '/user/remove' ? 'text-bluerose border-r-2 border-rose-500' : ''} w-full`}>Remove Account</Link>
                <Link href={"/logout"} className={`hover:text-rose-500 block hover:border-r-rose-500 hover:border-r-2 mini:text-sm micro:text-xs ${pathname === '/logout' ? 'text-rose-500 border-r-2 border-rose-500' : ''} w-full`}>Log Out</Link>
            </div>
        </div>
    )
}

export default Dashboard
