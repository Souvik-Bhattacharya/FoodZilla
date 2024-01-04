import Menu from "@/components/Menu";

const getFoods = async () => {
    console.log(process.env.HOST)
    let response = await fetch(`${process.env.HOST}/api/getfoods`, { next: { revalidate: 1 } });
    return await response.json();
}

const page = async () => {
    const data = await getFoods();
    return (
        <Menu data={data}/>
    )
}

export default page;
