'use client'
import Image from "next/image";
import Link from "next/link";
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faMagnifyingGlass,
    faSort
} from "@fortawesome/free-solid-svg-icons";

const Menu = (props) => {
    const data = props.foods.sort((a, b) => a.price - b.price);
    let [foods, setfoods] = useState(data);
    const search = (e) => {
        let items = data.filter(item => {
            let lowerCaseItem = item.name.toLowerCase();
            let lowerCaseSearch = e.target.value.toLowerCase();
            if (lowerCaseItem.includes(lowerCaseSearch)) {
                return item;
            }
        })
        setfoods(items)
    }
    const sort = (e) => {
        if (e.target.value === 'ascending') {
            let items = foods;
            items = items.sort((a, b) => a.price - b.price)
            setfoods(items)
        }
        else if (e.target.value === 'descending') {
            let items = foods;
            items = items.sort((a, b) => b.price - a.price)
            setfoods(items)
        }
    }
    return (
        <div className='h-full grid gap-5 text-center p-10 overflow-auto col-span-4 small:col-span-5'>
            {
                props.category ? <h1 className='text-xl font-bold text-blue-500 italic row-span-1'>{props.category}</h1> : <h1 className='text-xl font-bold text-blue-500 italic row-span-1'>Menu</h1>
            }
            <div className="flex items-center justify-center w-full gap-3 mini:flex-col">
                <form action="" className="flex items-center w-1/3 mini:w-full">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-blue-500 p-2 bg-slate-100 border-2 border-blue-300 rounded-md border-r-0 rounded-r-none" />
                    <input type="search" className="bg-slate-100 w-full p-1 border-2 border-blue-300 rounded-md border-l-0 rounded-l-none caret-blue-500" placeholder="Search Your Food " onChange={search} />
                </form>
                <div className="flex items-center gap-2">
                    <label htmlFor="sort"><FontAwesomeIcon icon={faSort} className="text-blue-500" /></label>
                    <select id="sort" className="bg-slate-100 border-2 border-blue-300 rounded-md py-1" onChange={sort}>
                        <option value="ascending">Ascending</option>
                        <option value="descending">Descending</option>
                    </select>
                </div>
            </div>
            {
                (foods.length != 0) ?
                    <div className='h-full row-span-9 grid grid-cols-[repeat(auto-fit,200px)] gap-5 justify-center'>
                        {foods.map((food) => {
                            return (
                                <div key={food._id} className='h-fit flex flex-col items-center hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-200 rounded-xl overflow-hidden'>
                                    <p className='border-2 border-blue-100 text-sm sticky opacity-75 p-2 bg-white w-[200px] text-center'>{food.name}</p>
                                    <Image src={food.image} alt="" width={200} height={200} className="w-[200px] h-[200px]" />
                                    <Link href={`/menu/food/${food._id}`} className='bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 active:from-cyan-400 active:to-blue-400 text-white font-bold p-2 text-base w-full text-center'>₹{food.price}</Link>
                                </div>
                            )
                        })}
                    </div> :
                    <div className="h-full flex justify-center row-span-9 p-5">
                        <p>No Food Item Is Found!</p>
                    </div>
            }
        </div>
    )
}

export default Menu
