import React from 'react'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className='flex justify-evenly items-center bg-slate-100'>
            <div className='flex flex-col w-fit p-10 gap-3'>
                {/* <img src={logo} alt="Logo" /> */}
                <h3>&copy; FoodZilla</h3>
                <p>Designed and Developed by Souvik Bhattacharya</p>
            </div>
            <div className="flex flex-col gap-3 w-fit p-10">
                <h1>Links</h1>
                <hr />
                <div className="flex flex-col gap-1">
                    <Link href={"/"}>Home</Link>
                    <Link href={"/menu"}>Menu</Link>
                    <Link href={"/cart"}>Cart</Link>
                    <Link href={"/myorders"}>My Orders</Link>
                </div>
            </div>
            <div className="flex flex-col gap-3 w-fit p-10">
                <h1>Social</h1>
                <hr />
                <div id="flex flex-col gap-1">
                    <div className="">
                        {/* <img src={github} alt="" /> */}
                        <Link href={"https://github.com/Souvik-Bhattacharya"} target="blank">Github</Link>
                    </div>
                    <div className="">
                        {/* <img src={email} alt="" /> */}
                        <Link href={"mailto:https://souvikbh12@gmail.com"} target="blank">Email</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
