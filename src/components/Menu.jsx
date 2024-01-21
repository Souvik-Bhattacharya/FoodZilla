'use client'
import Image from "next/image";
import Link from "next/link";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMagnifyingGlass,
    faSort,
    faHeart
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { parseCookies } from 'nookies'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InfiniteScroll from "react-infinite-scroll-component";
import { DNA } from "react-loader-spinner";

const Menu = (props) => {
    const data = props.foods;
    const { push } = useRouter();
    let [foods, setfoods] = useState(data);
    let [likes, setlikes] = useState(props.likes);
    let [page, setpage] = useState(1);
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
    const sortByPrice = (e) => {
        if (e.target.value === 'ascending') {
            let items = [...foods];
            items.sort((a, b) => a.price - b.price)
            setfoods([...items])
        }
        else if (e.target.value === 'descending') {
            let items = [...foods];
            items = items.sort((a, b) => b.price - a.price)
            setfoods([...items])
        }
    }
    const plus = async (fid, like) => {
        const cookies = parseCookies();
        if (!cookies["usertoken"]) {
            push("/user/login")
        }
        else {
            let response1 = await fetch(`${props.HOST}/api/like/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'usertoken': cookies["usertoken"]
                },
                body: JSON.stringify({ fid })
            })
            let msg1 = await response1.json()
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
            }
            else {
                setlikes([...likes, msg1.fid])
                like = like + 1;
                let response2 = await fetch(`${props.HOST}/api/foods/update`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'usertoken': cookies["usertoken"]
                    },
                    body: JSON.stringify({ fid, like })
                });
                let msg2 = await response2.json()
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
                }
                else {
                    let fooditems = foods.map((e) => {
                        if (e._id === fid) { e.likes = like }
                        return e
                    })

                    setfoods(fooditems)
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
            let response1 = await fetch(`${props.HOST}/api/like/remove`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'usertoken': cookies["usertoken"]
                },
                body: JSON.stringify({ fid })
            })
            let msg1 = await response1.json()
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
            }
            else {
                let items = likes.filter((e) => {
                    if (e !== fid) {
                        return e
                    }
                })
                setlikes(items)
                like = like - 1
                let response2 = await fetch(`${props.HOST}/api/foods/update`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'usertoken': cookies["usertoken"]
                    },
                    body: JSON.stringify({ fid, like })
                })
                let msg2 = await response2.json()
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
                }
                else {
                    let fooditems = foods.map((e) => {
                        if (e._id === fid) { e.likes = like }
                        return e
                    })

                    setfoods(fooditems)
                }
            }
        }
    }
    return (
        <div className='h-full grid gap-5 text-center p-10 overflow-auto col-span-4 small:col-span-5'>
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
            {
                props.category ? <h1 className='text-xl font-bold text-blue-500 italic row-span-1'>{props.category}</h1> : <h1 className='text-xl font-bold text-blue-500 italic row-span-1'>Menu</h1>
            }
            <div className="flex items-center justify-center w-full gap-3 mini:flex-col">
                <form action="" className="flex items-center w-1/3 mini:w-full">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-blue-500 p-2 bg-slate-100 border-2 border-blue-300 rounded-md border-r-0 rounded-r-none" />
                    <input type="search" className="bg-slate-100 w-full p-1 border-2 border-blue-300 rounded-md border-l-0 rounded-l-none caret-blue-500" placeholder="Search Your Food " onChange={search} />
                </form>
                <form action="" className="flex items-center gap-2">
                    <label htmlFor="sort"><FontAwesomeIcon icon={faSort} className="text-blue-500" /></label>
                    <select id="sort" defaultValue={'default'} className="bg-slate-100 border-2 border-blue-300 rounded-md py-1" onChange={sortByPrice}>
                        <option value="default" disabled hidden>Select...</option>
                        <option value="ascending">Ascending</option>
                        <option value="descending">Descending</option>
                    </select>
                </form>
            </div>

            {
                (foods.length != 0) ?
                    <div className='h-full row-span-9 grid grid-cols-[repeat(auto-fit,200px)] gap-5 justify-center'>
                        {foods.map((food) => {
                            return (
                                <div key={food._id} className='h-fit flex flex-col items-center hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-200 rounded-xl overflow-hidden'>
                                    <div className='border-2 border-blue-100 border-b-0 text-sm p-1 w-[200px] text-center'>
                                        <p>{food.name}</p>
                                    </div>
                                    <div className="flex justify-center gap-1 items-center border-2 border-blue-100 border-t-0 w-[200px]">
                                        {
                                            (likes.includes(food._id)) ?
                                                <button onClick={() => { minus(food._id, food.likes) }}>
                                                    <FontAwesomeIcon icon={faHeart} className="text-rose-500" />
                                                </button>
                                                :
                                                <button onClick={() => { plus(food._id, food.likes) }}>
                                                    <FontAwesomeIcon icon={faHeart} className="text-blue-500" />
                                                </button>
                                        }
                                        <p className="text-xs">{food.likes}</p>
                                    </div>
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
            <InfiniteScroll
                dataLength={foods.length}
                next={async () => {
                    let res;
                    if (props.category) {
                        res = await props.getFoods(props.category, page);
                    }
                    else {
                        res = await props.getFoods(page);
                    }
                    setfoods([...foods, ...res])
                    setpage(page + 1)
                }}
                hasMore={foods.length !== props.total}
                loader={<div className="flex flex-col items-center w-full">
                    <DNA
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="dna-loading"
                        wrapperStyle={{}}
                        wrapperClass="dna-wrapper"
                    />
                    <p className="text-blue-500">Loading...</p>
                </div>}
                endMessage={<div className="text-center">No More Items Found</div>}
            />
        </div>
    )
}

export default Menu
