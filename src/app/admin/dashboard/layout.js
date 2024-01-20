import { cookies } from "next/headers";
import Dashboard from "@/components/admin/Dashboard";

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
    if(data.error){
        console.log(data.error)
    }
    else{
        return data
    }
}

const pageLayout = async ({ children }) => {
    const admin = await getAdmin()
    return (
        <div className='grid grid-flow-col grid-cols-4 h-screen'>
            <Dashboard admin={admin}/>
            {children}
        </div>
    )
}

export default pageLayout;
