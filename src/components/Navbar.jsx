import React from 'react'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faGear
} from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image'

const getUser = async () => {
  const response = await fetch(`${process.env.HOST}/api/auth/user/get`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "usertoken": cookies().get("usertoken").value
    }
  }, { next: { revalidate: 1 } })
  const data = await response.json()
  return data
}

const getAdmin = async () => {
  const response = await fetch(`${process.env.HOST}/api/auth/admin/get`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "admintoken": cookies().get("admintoken").value
    }
  }, { next: { revalidate: 1 } })
  const data = await response.json()
  return data
}

const Navbar = async () => {
  let data;
  if (cookies().has("usertoken")) {
    data = await getUser()
  }
  else if (cookies().has("admintoken")) {
    data = await getAdmin()
  }
  return (
    <div className='flex items-center justify-evenly p-5 bg-slate-100'>
      <div className='flex gap-2 items-center'>
        <Image src={'/icon.png'} height={25} width={25} alt=''></Image>
        <p className='text-blue-500 font-bold italic text-xl'>FoodZilla</p>
      </div>
      <div className='flex gap-3 items-center'>
        <Link href={"/"} className='active:text-blue-500'>Home</Link>
        <Link href={"/menu"} className='active:text-blue-500'>Menu</Link>
        <Link href={"/cart"} className='active:text-blue-500'>Cart</Link>
        <Link href={"/orders"} className='active:text-blue-500'>My Orders</Link>
      </div>
      {(cookies().has('usertoken') || cookies().has('admintoken')) ?
        <div className='flex gap-3 items-center'>
          {cookies().has("usertoken") ? <Link href={"/user/dashboard/profile"} className='flex gap-2 items-center'>
            Hi! {data.name.split(" ")[0]}
            <Image src={data.image} alt="" height={25} width={25} className='rounded-full ring-2 ring-blue-500' />
          </Link> : <></>}
          {cookies().has("admintoken") ? <Link href={"/admin/dashboard/profile"} className='flex gap-2 items-center'>
            Hi! {data.name.split(" ")[0]}
            <Image src={data.image} alt="" height={25} width={25} className='rounded-full ring-2 ring-blue-500' />
          </Link> : <></>}
          <Link href={"/logout"}><FontAwesomeIcon icon={faArrowRightFromBracket} size='lg' className='text-blue-500'/></Link>
        </div> : <div className='flex gap-3'>
          <Link href={"/user/login"}><FontAwesomeIcon icon={faArrowRightToBracket} size='lg' className='text-blue-500'/></Link>
          <Link href={"/admin/login"}><FontAwesomeIcon icon={faGear} size='lg' className='text-blue-500'/></Link>
        </div>
      }
    </div>
  )
}

export default Navbar;
