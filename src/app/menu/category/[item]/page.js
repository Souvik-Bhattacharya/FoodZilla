import Menu from '@/components/Menu';
import { cookies } from 'next/headers'
import { getHost } from '@/app/actions';
import React from "react";

const getFoods = async (item, page) => {
    "use server"
    let response = await fetch(`${process.env.HOST}/api/foods/get?category=${item}&page=${page}`, { cache: 'no-store' });
    let data = await response.json();
    if (data.error) {
        console.log(data.error)
    }
    else {
        return data
    }
}

const getTotal = async (item) => {
    let response = await fetch(`${process.env.HOST}/api/foods/total?category=${item}`);
    let data = await response.json();
    if (data.error) {
        console.log(data.error)
    }
    else {
        return data.total
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
    const foods = await getFoods(params.item, 0);
    const total = await getTotal(params.item);
    const host = await getHost();
    let likes = [];
    if (cookies().has('usertoken')) {
        likes = await getLikes();
    }
    return (
        <Menu foods={foods} category={params.item} likes={likes} HOST={host} getFoods={getFoods} total={total} />
    )
}

export default page
