import Login from "@/components/user/Login";
import { getHost } from "../../actions";

const page = async () => {
    const host = await getHost();
    return (
        <Login HOST={host} />
    )
}

export default page
