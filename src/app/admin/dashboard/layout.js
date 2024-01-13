import Link from "next/link";
import { cookies } from "next/headers";
import Image from "next/image";

const getAdmin = async () => {
    const cookieStore = cookies()
    const admintoken = cookieStore.get('admintoken')
    let response = await fetch(`${process.env.HOST}/api/auth/admin/get`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "admintoken": admintoken.value
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
    const admin = await getAdmin()
    return (
        <div className='grid grid-flow-col grid-cols-4 h-screen'>
            <div className='flex flex-col items-start p-20 gap-3 h-full shadow'>
                <Image src={admin.image} alt="" height={50} width={50} className="rounded-full ring-2 ring-blue-500" />
                <h1 className="text-blue-500 text-xl font-bold italic">{admin.email}</h1>
                <hr className='w-full ' />
                <Link href={"/admin/dashboard/profile"} className="hover:w-full hover:border-r-2 hover:border-blue-500 hover:text-blue-500 ">Profile</Link>
                <Link href={"/admin/dashboard/orders"} className="hover:w-full hover:border-r-2 hover:border-blue-500 hover:text-blue-500 ">Orders</Link>
                <Link href={"/admin/dashboard/foods/add"} className="hover:w-full hover:border-r-2 hover:border-blue-500 hover:text-blue-500 ">Add Food</Link>
                <Link href={"/admin/dashboard/foods/remove"} className="hover:w-full hover:border-r-2 hover:border-blue-500 hover:text-blue-500 ">Remove Food</Link>
                <Link href={"/admin/dashboard/category/add"} className="hover:w-full hover:border-r-2 hover:border-blue-500 hover:text-blue-500 ">Add Category</Link>
                <Link href={"/admin/dashboard/category/remove"} className="hover:w-full hover:border-r-2 hover:border-blue-500 hover:text-blue-500 ">Remove Category</Link>
                <Link href={"/logout"}>Log Out</Link>
            </div>
            {children}
        </div>
    )
}

export default pageLayout;
