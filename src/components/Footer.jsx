import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faEnvelope
} from "@fortawesome/free-solid-svg-icons";

import {
    faGithub,
    faLinkedinIn
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return (
        <footer className='flex justify-evenly items-center bg-slate-100 mini:flex-col mini:items-center'>
            <div className='flex flex-col w-fit p-10 gap-3 mini:items-center mini:text-center'>
                <Image src={'/icon.png'} height={50} width={50} alt=''></Image>
                <div className='text-blue-500 font-bold italic text-xl'>&copy; FoodZilla</div>
                <div>Designed and Developed by Souvik Bhattacharya</div>
            </div>
            <div className="flex flex-col gap-3 w-fit p-10 mini:items-center mini:text-center">
                <div className='text-lg text-blue-500'>Links</div>
                <hr />
                <div className="flex flex-col gap-1">
                    <Link href={"/"} className='hover:text-blue-500'>Home</Link>
                    <Link href={"/menu"} className='hover:text-blue-500'>Menu</Link>
                    <Link href={"/cart"} className='hover:text-blue-500'>Cart</Link>
                    <Link href={"/orders"} className='hover:text-blue-500'>My Orders</Link>
                </div>
            </div>
            <div className="flex flex-col gap-3 w-fit p-10 mini:items-center mini:text-center">
                <div className='text-lg text-blue-500'>Social</div>
                <hr />
                <div id="flex flex-col gap-1">
                    <div className="flex gap-2 items-center">
                        <FontAwesomeIcon icon={faGithub} className='text-blue-500' />
                        <Link href={"https://github.com/Souvik-Bhattacharya/FoodZilla"} target="blank" className='hover:text-blue-500'>Github</Link>
                    </div>
                    <div className="flex gap-2 items-center">
                        <FontAwesomeIcon icon={faLinkedinIn} className='text-blue-500' />
                        <Link href={"https://linkedin.com/in/souvik-bhattacharya763"} target="blank" className='hover:text-blue-500'>LinkedIn</Link>
                    </div>
                    <div className="flex gap-2 items-center">
                        <FontAwesomeIcon icon={faEnvelope} className='text-blue-500' />
                        <Link href={"mailto:https://souvikbh12@gmail.com"} target="blank" className='hover:text-blue-500'>Email</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
