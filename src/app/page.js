import Image from 'next/image'
import Link from 'next/link'

const getCategories = async () => {
  const response = await fetch(`${process.env.HOST}/api/category/get`)
  const data = await response.json()
  if (data.error) {
    console.log(data.error)
  }
  else {
    return data
  }
}

export default async function Home() {
  const categories = await getCategories();
  return (
    <main className="flex flex-col">
      <div className="h-[60vh] flex justify-center items-center bg-slate-100">
        <div className='p-12 flex flex-col gap-3'>
          <div className='text-5xl flex gap-1'>It&apos;s not just <p className='text-blue-400'>Food</p></div>
          <div className='text-5xl flex gap-1'>It&apos;s an <p className='text-blue-500'>Experience</p></div>
          <div>Your go-to destination for delicious meals delivered right to your door step.</div>
          <div><Link href={'/menu'}><button className='bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 active:from-cyan-400 active:to-blue-400 hover:shadow-blue-200 hover:shadow-md text-white font-bold p-2'>Order Now &gt;</button></Link></div>
        </div>
        <div className='h-full flex items-end'>
          <Image src="/home_bg.png" width={800} height={800} alt="" />
        </div>
      </div>
      <div className='flex flex-col p-12 gap-10'>
        <div className='text-xl font-bold text-blue-500 italic text-center'>Categories</div>
        <div className='flex flex-wrap gap-5 justify-center'>
          {categories.map((category) => {
            return (
              <div key={category._id} className='h-fit flex flex-col items-center hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-200 rounded-xl overflow-hidden w-[200px] bg-slate-100'>
                <Image src={category.image} alt="" width={200} height={200} className="p-7" />
                <Link href={`/menu/category/${category.name}`} className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold p-2 text-base w-full text-center'>{category.name}</Link>
              </div>
            )
          })}
        </div>
      </div>
      <div className='flex flex-col p-12 gap-5 bg-slate-100'>
        <div className='text-xl font-bold text-blue-500 italic text-center'>About Us</div>
        <div className='flex justify-center gap-2'>
          <div className='flex flex-col p-12 gap-2 w-[40vw] items-center text-center'>
            <div className='text-lg font-bold text-blue-500 text-center'>Why To Choose?</div>
            <p>Explore a diverse range of cuisines</p>
            <p>Our user-friendly platform makes ordering a breeze</p>
            <p>Conut on us to bring your food to your door-step promptly</p>
            <p>We partner with top-notch resturants to guarantee the highest quality in every bite</p>
          </div>
          <div className='flex flex-col p-12 gap-2 items-center w-[40vw] text-center'>
            <div className='text-lg font-bold text-blue-500 text-center'>Our Mission</div>
            <p>
              Our mission is to connect you with a variety of culinary delights from local resturants, ensuring that you can enjoy your favourite dishes without leaving the comfort of your home. We strive to make every meal a delightful experience
            </p>
          </div>
        </div>
      </div>
      <div className='p-12 flex flex-col items-center gap-5 bg-slate-100'>
      <div className='text-xl font-bold text-blue-500 italic text-center'>Contact Us</div>
      <div className='text-4xl font-bold text-blue-400 text-center'>+91-01234-56789</div>
      </div>
    </main>
  )
}
