import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className='w-full p-28 justify-center place-items-center'>
            <div className='flex flex-col items-center'>
                <h1 className='text-5xl text-red-600 p-5'>Payment Failed</h1>
                <h1 className='text-2xl text-yellow-500 p-5'>Please try again later</h1>
                <Link href={"/cart"} className='underline text-xl'>Go Back to Cart Page</Link>
            </div>
        </div>
    )
}

export default page
