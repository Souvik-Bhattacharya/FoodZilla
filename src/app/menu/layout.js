import Link from "next/link";

const getCategories = async ()=>{
    const response = await fetch(`${process.env.HOST}/api/category/get`)
    const data = await response.json()
    if(data.error){
        console.log(data.error)
    }
    else{
        return data
    }
}

const pageLayout = async ({ children }) => {
    const catagories = await getCategories()
    return (
        <div className='grid grid-flow-col grid-cols-5 h-screen'>
            <div className='flex flex-col items-start p-10 gap-3 h-full shadow'>
                <h1 className="text-blue-500 text-xl font-bold italic">Category</h1>
                <hr className='w-full '/>
                <Link href={"/menu"} className="hover:w-full hover:border-r-2 hover:border-blue-500 hover:text-blue-500 ">All</Link>
                {catagories.map(category => {
                    return <Link href={`/menu/category/${category.name}`} className="hover:w-full hover:border-r-2 hover:border-blue-500 hover:text-blue-500 ">{category.name}</Link>
                })}
            </div>
            {children}
        </div>
    )
}

export default pageLayout;
