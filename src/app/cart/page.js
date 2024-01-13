import Cart from '@/components/Cart';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import { getHost } from '../actions';

const getCart = async () => {
    const cookieStore = cookies()
    const usertoken = cookieStore.get('usertoken')
    let response = await fetch(`${process.env.HOST}/api/cart/get`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "usertoken": usertoken.value
        }
    }, { cache: 'no-store' });
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
    let response = await fetch(`${process.env.HOST}/api/auth/user/get`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "usertoken": usertoken.value
        }
    }, { next: { revalidate: 1 } });
    let data = await response.json();
    if (data.error){
        alert("Unable to fetch user");
    }
    else{
        return data;
    }
}

const page = async () => {
    if(!cookies().has("usertoken")){
        redirect("/user/login")
    }
    let cart = await getCart();
    let user = await getUser();
    let host = await getHost();
    return (
        <Cart cart={cart} user={user} HOST={host}/>
    )
}

export default page