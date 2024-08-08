"use client";

import { rowUpdateSignal } from "@/controller/row_actions";
import { MdAdd } from "react-icons/md";

const Title = () => {
    return (
        <section className='flex justify-between items-center mb-5 mt-4'>
<h1 className="text-2xl font-bold">Videos</h1>
<button className='btn flex items-center gap-x-2 bg-gbg text-white mr-1'
onClick={()=>{
    rowUpdateSignal.value = {
        type:"video",
        action:"add",
        data:null,
    };
}}
> <MdAdd className='text-lg capitalize'/> Add Video</button>
</section>
    );
}

export default Title;