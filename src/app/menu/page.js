import Menu from "@/components/Menu";

const getFoods = async () => {
    let response = await fetch("http://localhost:3000/api/getfoods", { next: { revalidate: 1 } });
    return await response.json();
}

const page = async () => {
    const data = await getFoods();
    return (
        <Menu data={data}/>
    )
}

export default page;
