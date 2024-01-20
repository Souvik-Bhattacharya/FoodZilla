import { getHost } from '@/app/actions'
import Edit from '@/components/admin/Edit'
import { cookies } from 'next/headers'
import React from 'react'

const getAdmin = async () => {
    const cookieStore = cookies()
    const admintoken = cookieStore.get('admintoken')
    let response = await fetch(`${process.env.HOST}/api/auth/admin/get`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "admintoken": admintoken.value
        }
    }, { next: { revalidate: 1 } });
    let data = await response.json();
    if (data.error) {
        console.log(data.error)
    }
    else {
        return data;
    }
}

const page = async () => {
    const admin = await getAdmin();
    const host = await getHost()
    return (
        <Edit admin={admin} HOST={host} />
    )
}

export default page