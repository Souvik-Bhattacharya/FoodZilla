import Link from "next/link";

const pageLayout = ({ children }) => {
    return (
        <div className='grid grid-flow-col grid-cols-4 h-full'>
            <div className='flex flex-col items-center p-10 gap-4 shadow'>
                <h1>Category</h1>
                <hr className='w-full '/>
                <Link href={"/menu"}>All</Link>
                <Link href={"/menu/category/momo"}>Momo</Link>
                <Link href={"/menu/category/pizza"}>Pizza</Link>
                <Link href={"/menu/category/burger"}>Burger</Link>
            </div>
            {children}
        </div>
    )
}

export default pageLayout;
