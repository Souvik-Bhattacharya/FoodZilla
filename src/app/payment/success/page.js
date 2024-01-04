import Link from 'next/link'
import React from 'react'
import { cookies } from 'next/headers'

const getCartItems = async () => {
    const cookieStore = cookies()
    const usertoken = cookieStore.get('usertoken')
    let response = await fetch(`${process.env.HOST}/api/getcartitems`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "usertoken": usertoken.value
        }
    });
    let data = await response.json();
    if (data.error){
        alert("Unable to fetch user");
    }
    else{
        return data;
    }
}

const getFoods = async (id) => {
    let response = await fetch(`${process.env.HOST}/api/food?id=${id}`);
    const food = await response.json();
    if (food.error){
        alert("Unable to fetch food");
    }
    else{
        return food[0];
    }
}

const addOrders = async (foods)=>{
    const cookieStore = cookies()
    const usertoken = cookieStore.get('usertoken')
    for (let food of foods) {
        let response = await fetch(`${process.env.HOST}/api/addorder`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "usertoken": usertoken.value
            },
            body: JSON.stringify(food)
        })
        let data = await response.json();
        if (data.error) {
            alert(`Error: ${data.error}`);
            break;
        }
    }
}

const removeCart = async ()=>{
    const cookieStore = cookies()
    const usertoken = cookieStore.get('usertoken')
    let response = await fetch(`${process.env.HOST}/api/removecart`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "usertoken": usertoken.value
        }
    })
    let data = await response.json();
    if (data.error) {
        alert(`Error: ${data.error}`);
    }
}

const page = async () => {
    let cartItems = await getCartItems();
    let foodItems = []
    for (let item of cartItems) {
        let foodItem = await getFoods(item.fid);
        let food = {}
        food["fid"] = foodItem._id;
        food["name"] = foodItem.name;
        food["category"] = foodItem.category;
        food["desc"] = foodItem.desc;
        food["price"] = foodItem.price;
        food["cid"] = item._id;
        food["quantity"] = item.quantity;
        food["amount"] = item.amount;
        foodItems.push(food)
    }
    await addOrders(foodItems);
    await removeCart();
    return (
        <div className='w-full p-28 justify-center place-items-center'>
            <div className='flex flex-col items-center'>
                <h1 className='text-5xl text-green-600 p-5'>Payment Successful</h1>
                <h1 className='text-2xl text-yellow-500 p-5'>Your order will be delivered shortly</h1>
                <Link href={"/myorders"} className='underline text-xl'>Go Back to My Orders Page</Link>
            </div>
        </div>
    )
}

export default page;
