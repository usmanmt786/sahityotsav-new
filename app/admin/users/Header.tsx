
"use client";

import { rowUpdateSignal } from "@/controller/row_actions";
import { MdAdd } from "react-icons/md";

const UsersHeader = () => {
    return (<section className='flex justify-between items-center mb-5 mt-4'>
<h1 className="text-2xl font-bold">User Access</h1>
<button className='btn mr-1 flex items-center gbg text-white    gap-x-2'
onClick={()=>{
    rowUpdateSignal.value = {
        type:"user",
        action:"add",
        data:null,
    };
}}
> <MdAdd className='text-xl capitalize'/> Add User</button>
</section>
    );
}

export default UsersHeader;