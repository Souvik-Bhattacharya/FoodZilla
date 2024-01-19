import Menu from "@/components/Menu";
import React from "react";

const getFoods = async () => {
    let response = await fetch(`${process.env.HOST}/api/foods/get`, { cache: 'no-store' });
    return await response.json();
}

const page = async () => {
    const foods = await getFoods();
    return (
        <Menu foods={foods}/>
    )
}

export default page;
