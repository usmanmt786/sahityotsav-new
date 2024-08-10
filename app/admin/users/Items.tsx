"use client";

import { rowUpdateSignal } from "@/controller/row_actions";

const UserItems = ({users}:{users:any[]}) => {
    return (
        <div className="grid lg:grid-cols-3 gap-8">
            {
                users.map((item, index) => {
                    return <div key={index} className="relative border shadow-lg p-5 cursor-pointer ring-2 
                     ring-gray-200 hover:ring-primary duration-300"
                    onClick={()=>{
                        
                            rowUpdateSignal.value = {
                                type:"user",
                                action:"edit",
                                data:item,
                                
                            };
                        
                    }}
                    >
                        <div 
                        className="absolute top-0 right-0 text-xs bg-red-600 px-3 py-1 text-white rounded-bl-xl capitalize">
                            {item?.status}</div>
                        <h6 className="font-bold">{item?.name}</h6>
                        <div className="inline-flex rounded-full bg-green-600 text-xs text-white px-3 py-1 uppercase">{item?.role}</div>
                    </div>
                })
            }
        </div>
    );
}

export default UserItems;