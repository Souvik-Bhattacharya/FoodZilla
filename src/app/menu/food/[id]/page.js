import React from 'react'
import Food from "@/components/Food";
import { cookies } from 'next/headers'
import { getHost } from '@/app/actions';

const getFoods = async (id) => {
    let response = await fetch(`${process.env.HOST}/api/foods/get?id=${id}`, { cache: 'no-store' });
    let data = await response.json();
    if (data.error) {
        console.log(data.error)
    }
    else {
        return data;
    }
}
const getLikes = async () => {
    const cookieStore = cookies()
    const usertoken = cookieStore.get('usertoken')
    let response = await fetch(`${process.env.HOST}/api/like/get`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'usertoken': usertoken.value
        }
    }, { cache: 'no-store' });
    let data = await response.json();
    let likes = data.map((e) => {
        return e.fid;
    })
    return likes;
}

const page = async ({ params }) => {
    const data = await getFoods(params.id);
    const host = await getHost();
    let likes = [];
    if (cookies().has('usertoken')) {
        likes = await getLikes();
    }
    return (
        <Food data={data} HOST={host} likes={likes} />
    )
}

export default page