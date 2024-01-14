'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faGreaterThan,
    faLessThan
} from "@fortawesome/free-solid-svg-icons";

const Category = (props) => {
    const pathname = usePathname()
    const categories = props.categories
    const open = () => {
        document.getElementById('cat').style.display = 'flex'
        document.getElementById('close').style.display = 'flex'
        document.getElementById('open').style.display = 'none'
        document.getElementById('main').style.height = '100%'
    }
    const close = () => {
        document.getElementById('cat').style.display = 'none'
        document.getElementById('close').style.display = 'none'
        document.getElementById('open').style.display = 'flex'
        document.getElementById('main').style.height = 'fit-content'
    }
    return (
        <div id='main' className='flex flex-col h-fit w-fit shadow-inner overflow-x-hidden overflow-y-auto small:absolute small:z-10 small:bg-slate-100'>
            <div id='open' className='flex-nowrap cursor-pointer items-center hidden small:flex p-2 gap-1'><p className='text-xs text-blue-500 italic'>Categories</p><FontAwesomeIcon icon={faGreaterThan} className='text-blue-500' onClick={open}/></div>
            <FontAwesomeIcon id='close' icon={faLessThan} className='text-blue-500 cursor-pointer hidden self-end p-3' onClick={close}/>
            <div id='cat' className='flex flex-col items-start p-10 small:pt-0 gap-3 h-fit w-fit small:w-[50vw] small:hidden'>
                <h1 className="text-blue-500 text-xl font-bold italic">Category</h1>
                <hr className='w-full' />
                <Link href={"/menu"} className={`hover:text-blue-500 block hover:border-r-blue-500 hover:border-r-2 ${pathname === '/menu' ? 'text-blue-500 border-r-2 border-blue-500' : ''} w-full`}>All</Link>
                {categories.map(category => {
                    return <Link href={`/menu/category/${category.name}`} key={category._id} className={`hover:text-blue-500 block hover:border-r-blue-500 hover:border-r-2 ${pathname === `/menu/category/${category.name}` ? 'text-blue-500 border-r-2 border-blue-500' : ''} w-full`}>{category.name}</Link>
                })}
            </div>
        </div>
    )
}

export default Category
