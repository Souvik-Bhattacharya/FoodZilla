import Signup from "@/components/user/Signup";
import { getHost } from "../../actions";

const page = async () => {
    const host = await getHost();
    return (
        <Signup HOST={host}/>
    )
}

export default page;
