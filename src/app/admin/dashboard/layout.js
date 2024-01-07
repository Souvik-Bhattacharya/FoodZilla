import Link from "next/link";

const pageLayout = ({ children }) => {
    return (
        <div className='grid grid-flow-col grid-cols-4 h-full'>
            <div className='flex flex-col items-start p-24 gap-3 h-full shadow'>
                <h1>Admin</h1>
                <hr className='w-full '/>
                <Link href={"/admin/dashboard/profile"}>Profile</Link>
                <Link href={"/admin/dashboard/orders"}>Orders</Link>
                <Link href={"/admin/dashboard/foods/add"}>Add Food</Link>
                <Link href={"/admin/dashboard/foods/remove"}>Remove Food</Link>
                <Link href={"/admin/dashboard/category/add"}>Add Category</Link>
                <Link href={"/admin/dashboard/category/remove"}>Remove Category</Link>
                <Link href={"/logout"}>Log Out</Link>
            </div>
            {children}
        </div>
    )
}

export default pageLayout;
