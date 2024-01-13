import { getHost } from '@/app/actions'
import Edit from '@/components/user/Edit'
import { cookies } from 'next/headers'
import React from 'react'

const getUser = async () => {
    const cookieStore = cookies()
    const usertoken = cookieStore.get('usertoken')
    let response = await fetch(`${process.env.HOST}/api/auth/user/get`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "usertoken": usertoken.value
        }
    }, { next: { revalidate: 1 } });
    let data = await response.json();
    if (data.error) {
        console.log(data.error);
    }
    else {
        return data;
    }
}

const page = async () => {
    const user = await getUser();
    const host = await getHost()
    return (
        <Edit user={user} HOST={host}/>
    )
}

export default page