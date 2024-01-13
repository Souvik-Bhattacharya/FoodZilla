import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className='w-full h-screen flex p-20 justify-center overflow-auto'>
            <div className='flex flex-col items-center'>
                <h1 className='text-3xl text-red-600 p-5'>Payment Failed</h1>
                <h1 className='text-xl text-blue-500 p-5'>Please try again later</h1>
                <Link href={"/cart"} className='underline text-lg'>Go Back to Cart Page</Link>
            </div>
        </div>
    )
}

export default page
