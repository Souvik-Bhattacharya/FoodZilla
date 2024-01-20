import Menu from '@/components/Menu';
import React from 'react'

const getFoods = async (item) => {
    let response = await fetch(`${process.env.HOST}/api/foods/get?category=${item}`, { cache: 'no-store' });
    let data = await response.json();
    if(data.error){
        console.log(data.error)
    }
    else{
        return data
    }
}

const page = async ({ params }) => {
    const foods = await getFoods(params.item);
    return (
        <Menu foods={foods} category={params.item}/>
    )
}

export default page
