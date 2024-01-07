import React from 'react'
import Food from "@/components/Food";
import { getHost } from '@/app/actions';

const getFoods = async (id) => {
    let response = await fetch(`${process.env.HOST}/api/foods/get?id=${id}`, { next: { revalidate: 1 } });
    let data = await response.json();
    if (data.error) {
        console.log(data.error)
    }
    else {
        return data;
    }
}

const page = async ({ params }) => {
    const data = await getFoods(params.id);
    const host = await getHost();
    return (
        <Food data={data} HOST={host} />
    )
}

export default page