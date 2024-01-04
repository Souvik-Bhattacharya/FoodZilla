import React from 'react'
import Menu from "@/components/Menu";

const getFoods = async (item) => {
    let response = await fetch(`${process.env.HOST}/api/getfoods?item=${item}`, { next: { revalidate: 1 } });
    return await response.json();
}

const page = async ({params}) => {
    const data = await getFoods(params.item);
    return (
        <Menu data={data}/>
    )
}

export default page
