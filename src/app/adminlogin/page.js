import Adminlogin from "@/components/adminlogin"
import { getHost } from "../actions";

const page = async () => {
    const host = await getHost();
    return (
        <Adminlogin HOST={host}/>
    )
}

export default page;
