import React from 'react'
import Link from 'next/link'
import { cookies } from 'next/headers'

const getUser = async () => {
  const response = await fetch(`${process.env.HOST}/api/auth/user/get`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "usertoken": cookies().get("usertoken").value
    }
  })
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
  })
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
    <div className='flex items-center justify-evenly p-5 shadow'>
      <div>
        <p className='text-blue-500 font-bold italic text-xl'>FoodZilla</p>
      </div>
      <div className='flex gap-3 items-center'>
        <Link href={"/"}>Home</Link>
        <Link href={"/menu"}>Menu</Link>
        <Link href={"/cart"}>Cart</Link>
        <Link href={"/orders"}>My Orders</Link>
      </div>

      {(cookies().has('usertoken') || cookies().has('admintoken')) ?
        <div className='flex gap-3 items-center'>
          <Link href={"/logout"}>Log Out</Link>
          {cookies().has("usertoken") ? <Link href={"/user/dashboard/profile"} className='flex gap-1 items-center'><img src={data.image} alt="" height={25} width={25} className='rounded-full' />Hi! {data.name.split(" ")[0]}</Link> : <></>}
          {cookies().has("admintoken") ? <Link href={"/admin/dashboard/profile"} className='flex gap-1 items-center'><img src={data.image} alt="" height={25} width={25} className='rounded-full' />Hi! {data.name.split(" ")[0]}</Link> : <></>}
        </div> : <div className='flex gap-3'>
          <Link href={"/user/login"}>Login</Link>
          <Link href={"/admin/login"}>Admin</Link>
        </div>
      }
    </div>
  )
}

export default Navbar;
