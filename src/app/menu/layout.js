import Category from "@/components/Category";

const getCategories = async ()=>{
    const response = await fetch(`${process.env.HOST}/api/category/get`, { cache: 'no-store' })
    const data = await response.json()
    if(data.error){
        console.log(data.error)
    }
    else{
        return data
    }
}

const pageLayout = async ({ children }) => {
    const categories = await getCategories()
    return (
        <div className='grid grid-flow-col grid-cols-5 h-screen'>
            <Category categories={categories}/>
            {children}
        </div>
    )
}

export default pageLayout;
