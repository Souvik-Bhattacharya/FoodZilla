import Menu from '@/components/Menu';
import React from 'react'

const getFoods = async (item) => {
    let response = await fetch(`${process.env.HOST}/api/foods/get?category=${item}`, { cache: 'no-store' });
    return await response.json();
}

const page = async ({ params }) => {
    const foods = await getFoods(params.item);
    return (
        <Menu foods={foods} category={params.item}/>
    )
}

export default page
