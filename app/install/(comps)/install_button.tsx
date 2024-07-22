"use client";

import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiDownloadCloud } from "react-icons/fi";
import install, { createUser } from "../func";
import toast from "react-hot-toast";
import { MdCheckCircle, MdOutlineError } from "react-icons/md";
import '../style.css';

const InstallButton = () => {
    const [loading, setLoading] = useState(false);
    const [stage, setStage] = useState(0);
    const [errorStage, setErrorStage] = useState(0);


    async function installAction(){
      setLoading(true);
      setStage(1);
    await new Promise(r=>setTimeout(r, 1500));
    setStage(2);
      const res = await install();
      if(res!==0){
        setErrorStage(2);
        toast.error("Failed to install software");
        return;
      }else{
        toast.success("Software installed");
      }
      await new Promise(r=>setTimeout(r, 1000));
      setStage(3);
      const userRes = await createUser();
      if(!userRes){
        setErrorStage(3);
        toast.error("Failed to Create User");
        return;
      }else{
        toast.success("User Created");
        await new Promise(r=>setTimeout(r, 1000));
        setStage(4);
       setTimeout(()=> window.location.reload(),2000);
      }
      
      setLoading(false);
    }
    return (
        <>
        {stage===0 && 
        <button
        className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg my-6 flex 
        justify-center items-center gap-x-3"
        onClick={installAction}
        data-aos="fade-up" data-aos-delay="1000">
          {
            loading? <>
            <AiOutlineLoading3Quarters className="text-xl animate-spin"/> Installing...
            </>:<><FiDownloadCloud />
          Install Software</>
          }
         
        </button>
        }
        
        <div className="mt-6">
        {stage>0 && <div className="loadprogress"><Load isDone={stage>1} error={errorStage===1}/>  Getting things ready</div>}
        {stage>1 && <div className="loadprogress"><Load isDone={stage>2} error={errorStage===2}/>  Prefilling Categories & Programs</div>}
        {stage>2 && <div className="loadprogress"><Load isDone={stage>3} error={errorStage===3}/>  Creating Admin User</div>}
        {stage>3 && <div className="loadprogress"><Load isDone={stage>4} error={errorStage===4}/>  Finish Installation</div>}
        </div>
        </>
    );
}

export default InstallButton;


export function Load({isDone,error}:{isDone:boolean,error:boolean}){
  return error? <MdOutlineError className="text-2xl text-red-700"/>
  : isDone? <MdCheckCircle className="text-2xl text-green-700"/> : <AiOutlineLoading3Quarters className="animate-spin"/>
}