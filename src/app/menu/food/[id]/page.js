import React from 'react'
import Food from "@/components/Food";
import { getHost } from '@/app/actions';

const getFoods = async (id) => {
    let response = await fetch(`${process.env.HOST}/api/food?id=${id}`, { next: { revalidate: 1 } });
    let data = await response.json();
    if(data.error){
        alert("Unable to fetch food item")
    }
    else{
        return data;
    }
}

const page = async ({params}) => {
    const data = await getFoods(params.id);
    const host = await getHost();
    return (
        <div className='col-span-3 justify-center items-center h-full'>
            <Food data={data} HOST={host}/>
        </div>
    )
}

export default page