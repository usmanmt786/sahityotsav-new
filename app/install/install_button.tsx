"use client";

import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiDownloadCloud } from "react-icons/fi";
import install from "./func";
import toast from "react-hot-toast";

const InstallButton = () => {
    const [loading, setLoading] = useState(false);

    return (
        <button
        className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg my-6 flex 
        justify-center items-center gap-x-3"
        onClick={async ()=>{
            setLoading(true);
            const res = await install();
            setLoading(false);
            if(res!==0){
              toast.error("Failed to install software");
            }else{
              toast.success("Software installed");
              window.location.reload();
            }
        }}
        data-aos="fade-up" data-aos-delay="1000">
          {
            loading? <>
            <AiOutlineLoading3Quarters className="text-xl animate-spin"/> Installing...
            </>:<><FiDownloadCloud />
          Install Software</>
          }
        </button>
    );
}

export default InstallButton;