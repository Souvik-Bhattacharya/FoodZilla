import { getHost } from "@/app/actions";
import Reset from "@/components/user/Reset";

const page = async ({ params }) => {
    const host = await getHost();
    return (
        <Reset HOST={host} usertoken={params.id}/>
    )
}

export default page
