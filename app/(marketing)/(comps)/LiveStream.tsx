import Link from "next/link";
import { BsBroadcast } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";

const LiveStream = () => {
    return (
        <div className=" py-20 bg-red-700 text-white ">
           <section className="commonwidth">
           <div>
           <section className="inline-flex items-center animate-pulse gap-x-2 mb-2 border px-4 py-1 rounded-full cursor-pointer">
           <BsBroadcast className="text-xl "/> LIVE
           </section>
                <h1 className="text-5xl font-bold">Catch the Live Stream </h1>
                <p>
                Watch the event live and stay up-to-date with all the latest happenings
                </p>

                <div className="pt-4">
                <Link href={'/live'}
                className="bg-white px-4 py-3 text-red-600 font-bold rounded-lg inline-flex gap-x-2 items-center"
                ><FaYoutube className="text-2xl"/>Watch Now</Link>
                </div>
            </div>



            
           </section>
            
        </div>
    );
}

export default LiveStream;