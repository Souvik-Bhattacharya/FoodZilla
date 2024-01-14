import Dashboard from "@/components/user/Dashboard";
import { cookies } from "next/headers";

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
            <Dashboard user={user}/>
            {children}
        </div>
    )
}


export default pageLayout;
