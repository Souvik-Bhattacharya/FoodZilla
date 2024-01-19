import SendMail from "@/components/user/SendMail";
import { getHost } from "../../actions";

const page = async () => {
    const host = await getHost();
    return (
        <SendMail HOST={host}/>
    )
}

export default page
