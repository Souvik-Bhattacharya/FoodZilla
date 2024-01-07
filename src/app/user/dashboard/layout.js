import { cookies } from "next/headers";
import Link from "next/link";

const getUser = async () => {
    const cookieStore = cookies()
    const usertoken = cookieStore.get('usertoken')
    let response = await fetch(`${process.env.HOST}/api/auth/user/get`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "usertoken": usertoken.value
        }
    });
    let data = await response.json();
    if (data.error) {
        alert("Unable to fetch user");
    }
    else {
        return data;
    }
}

const pageLayout = async ({ children }) => {
    const user = await getUser()
    return (
        <div className='grid grid-flow-col grid-cols-4 h-screen'>
            <div className='flex flex-col items-start p-20 gap-3 h-full shadow'>
                <img src={user.image} alt="" height={75} width={75} className="rounded-full ring-2 ring-blue-500" />
                <h1 className="text-blue-500 text-xl font-bold italic">{user.email}</h1>
                <hr className='w-full ' />
                <Link href={"/user/dashboard/profile"} className="hover:w-full hover:border-r-2 hover:border-blue-500 hover:text-blue-500 ">My Profile</Link>
                <Link href={"/user/dashboard/orders"} className="hover:w-full hover:border-r-2 hover:border-blue-500 hover:text-blue-500 ">My Orders</Link>
                <Link href={"/user/remove"} className="hover:w-full hover:border-r-2 hover:border-rose-500 hover:text-rose-500 ">Remove Account</Link>
                <Link href={"/logout"} className="hover:w-full hover:border-r-2 hover:border-rose-500 hover:text-rose-500 ">Log Out</Link>
            </div>
            {children}
        </div>
    )
}

export default pageLayout;
