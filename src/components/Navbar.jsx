import React from 'react'
import Link from 'next/link'
import { cookies } from 'next/headers'

const Navbar = async () => {
  return (
    <div className='flex items-center justify-evenly p-5 shadow'>
      <div>
        <p className='text-blue-500 font-bold italic text-xl'>FoodZilla</p>
      </div>
      <div className='flex gap-3'>
        <Link href={"/"}>Home</Link>
        <Link href={"/menu"}>Menu</Link>
        <Link href={"/cart"}>Cart</Link>
        <Link href={"/myorders"}>My Orders</Link>
      </div>
      {(cookies().has('usertoken') || cookies().has('admintoken')) ?
        <div className='flex gap-3'>
          <Link href={"/logout"}>Log Out</Link>
          {cookies().has("usertoken")? <Link href={"/user"}>User</Link> : <></>}
          {cookies().has("admintoken")? <Link href={"/admin"}>Admin</Link> : <></>}
        </div> : <div className='flex gap-3'>
          <Link href={"/login"}>Login</Link>
          <Link href={"/adminlogin"}>Admin</Link>
        </div>
      }
    </div>
  )
}

export default Navbar;
