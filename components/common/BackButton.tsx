"use client";

import { usePathname, useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";


const BackButton = () => {
    const pathName  = usePathname();
    const router = useRouter();
    if(pathName==='/admin'){
        return <></>;
    }
    return (
        <div className="commonwidth">
            
            <button className="gbg px-4 py-2 rounded-lg shadow-xl mt-4 text-white 
             flex justify-center items-center group ring-primaryDark hover:ring-2 duration-300"
             onClick={() => router.back()}
             >
            <IoMdArrowBack className="group-hover:-translate-x-1 duration-300 mr-1"/>

                Go Back</button>
        </div>
    );
}

export default BackButton;