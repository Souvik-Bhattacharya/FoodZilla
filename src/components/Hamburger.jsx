'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBars,
    faXmark
} from "@fortawesome/free-solid-svg-icons";

const Hamburger = () => {

    const pathname = usePathname()

    const open = () => {
        document.getElementById('ham').style.display = 'flex'
    }

    const close = () => {
        document.getElementById('ham').style.display = 'none'
    }

    return (
        <div className='small:block hidden'>
            <FontAwesomeIcon icon={faBars} className='text-blue-500 cursor-pointer' onClick={open} />
            <div id='ham' className='hidden flex-col gap-3 absolute h-screen w-[50vw] inset-0 z-20 bg-slate-100 shadow-lg p-10'>
                <div className='flex items-center py-3 justify-between'>
                    <p className='text-blue-500 font-bold text-lg micro:text-xs italic'>Navigation</p>
                    <FontAwesomeIcon icon={faXmark} className='text-blue-500 cursor-pointer' onClick={close} />
                </div>
                <Link href={"/"} className={`hover:text-blue-500 block hover:border-r-blue-500 hover:border-r-2 ${pathname === '/' ? 'text-blue-500 border-r-2 border-blue-500' : ''}`}>Home</Link>
                <Link href={"/menu"} className={`hover:text-blue-500 block hover:border-r-blue-500 hover:border-r-2 micro:text-sm ${pathname === '/menu' ? 'text-blue-500 border-r-2 border-blue-500' : ''}`}>Menu</Link>
                <Link href={"/cart"} className={`hover:text-blue-500 block hover:border-r-blue-500 hover:border-r-2 micro:text-sm ${pathname === '/cart' ? 'text-blue-500 border-r-2 border-blue-500' : ''}`}>Cart</Link>
                <Link href={"/orders"} className={`hover:text-blue-500 block hover:border-r-blue-500 hover:border-r-2 micro:text-sm ${pathname === '/orders' ? 'text-blue-500 border-r-2 border-blue-500' : ''}`}>My Orders</Link>
            </div>
        </div>
    )
}

export default Hamburger
