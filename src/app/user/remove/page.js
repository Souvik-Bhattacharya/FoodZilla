import Remove from '@/components/user/Remove'
import { cookies } from 'next/headers'
import React from 'react'

const remove = async () => {
    const cookieStore = cookies()
    const usertoken = cookieStore.get('usertoken')
    const response = await fetch(`${process.env.HOST}/api/auth/user/remove`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "usertoken": usertoken.value
        }
    })
    const data = await response.json()
    if (data.error) {
        console.log(data.error)
    }
    else {
        return
    }
}

const page = async () => {
    await remove();
    return (
        <Remove/>
    )
}

export default page
