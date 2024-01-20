import Menu from "@/components/Menu";
import React from "react";

const getFoods = async () => {
    let response = await fetch(`${process.env.HOST}/api/foods/get`, { cache: 'no-store' });
    let data = await response.json();
    if(data.error){
        console.log(data.error)
    }
    else{
        return data
    }
}

const page = async () => {
    const foods = await getFoods();
    return (
        <Menu foods={foods}/>
    )
}

export default page;
