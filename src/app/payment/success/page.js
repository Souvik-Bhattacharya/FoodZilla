import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className='w-full p-28 justify-center place-items-center'>
            <div className='flex flex-col items-center'>
                <h1 className='text-5xl text-green-600 p-5'>Payment Successful</h1>
                <h1 className='text-2xl text-yellow-500 p-5'>Your order will be delivered shortly</h1>
                <Link href={"/myorders"} className='underline text-xl'>Go Back to My Orders Page</Link>
            </div>
        </div>
    )
}

export default page;
