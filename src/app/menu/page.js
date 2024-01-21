import Menu from "@/components/Menu";
import { cookies } from 'next/headers'
import { getHost } from '@/app/actions';
import React from "react";

const getFoods = async (page) => {
    "use server"
    let response = await fetch(`${process.env.HOST}/api/foods/get?page=${page}`, { cache: 'no-store' });
    let data = await response.json();
    if (data.error) {
        console.log(data.error)
    }
    else {
        return data
    }
}

const getTotal = async () => {
    let response = await fetch(`${process.env.HOST}/api/foods/total`);
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

const page = async () => {
    const foods = await getFoods(0);
    const total = await getTotal();
    const host = await getHost();
    let likes = [];
    if (cookies().has('usertoken')) {
        likes = await getLikes();
    }
    return (
        <Menu foods={foods} likes={likes} HOST={host} getFoods={getFoods} total={total} />
    )
}

export default page;
