import Cart from '@/components/Cart';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';

// , { next: { revalidate: 1 } }

const getCartItems = async () => {
    const cookieStore = cookies()
    const usertoken = cookieStore.get('usertoken')
    let response = await fetch(`http://localhost:3000/api/getcartitems`, {
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

const getUser = async () => {
    const cookieStore = cookies()
    const usertoken = cookieStore.get('usertoken')
    let response = await fetch(`http://localhost:3000/api/auth/user/getuser`, {
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
    let response = await fetch(`http://localhost:3000/api/food?id=${id}`);
    const food = await response.json();
    if (food.error){
        alert("Unable to fetch user");
    }
    else{
        return food[0];
    }
}

const page = async () => {
    if(!cookies().has("usertoken")){
        redirect("/login")
    }
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
    let user = await getUser();
    return (
        <Cart foodItems={foodItems} user={user}/>
    )
}

export default page