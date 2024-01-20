import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className='w-full h-screen flex p-10 justify-center overflow-auto'>
            <div className='flex flex-col items-center'>
                <h1 className='text-2xl text-red-600 p-5 text-center'>Payment Failed</h1>
                <Image src="/cancel.png" width={200} height={200} alt="" className='w-[200px] h-[200px]' />
                <h1 className='text-lg text-blue-500 p-5 text-center'>Please try again later</h1>
                <Link href={"/cart"} className='underline text-base text-center'>Go Back to Cart Page</Link>
            </div>
        </div>
    )
}

export default page
