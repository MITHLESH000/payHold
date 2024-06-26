
import Link from "next/link";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* nav bar section */}
      <div className="flex items-center justify-between h-14 w-full">
        {/* nav bar logo */}
        <div className="pl-10">
          <span>
            <Link href="/">
              <button className="text-gray-500 font-bold text-2xl hover:text-sky-300">Pay Hold</button>
            </Link>
          </span>
        </div>
        {/* nav bar Sing In */}
        <div className=" pr-10">
          <span>
            <Link href="/login">
              <button className=" text-gray-500 text-xl hover:text-sky-300 ">LogIn </button>
            </Link>
          </span>
          <span> / </span>
          <span>
            <Link href="/signup">
              <button className=" text-gray-500 text-xl hover:text-sky-300 "> Sing Up</button>
            </Link>
          </span>
        </div>
      </div>
      {/* hero section */}
      <div className=" flex items-center justify-center flex-col h-screen w-full bg-slate-600">
        <p>Hero section</p>
        <br/>
        <Link href="/learn">
              <button className=" w-40S text-gray-500 text-xl hover:text-sky-300 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"> Learn</button>
            </Link>
      </div>
      {/* footer section */}
      <div className="flex items-center justify-center h-56 w-full bg-slate-700">
        <p>footer secction</p>
      </div>

    </main>
  );
}
