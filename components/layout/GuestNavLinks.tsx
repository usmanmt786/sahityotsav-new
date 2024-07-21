"use client";

import Link from "next/link";

const GuestNavLinks = () => {
    const ITEMS = [
        {name:"About", link:"/about"},
        {name:"Contact", link:"/contact"},
        {name:"Results", link:"/results"},
    ];
    return (
        <div className="flex gap-x-8 ">
            {
                ITEMS.map((item)=>(
                    <Link 
                    href={item.link} 
                    key={item.name} 
                    className="text-white hover:-translate-y-1 duration-300">
                        {item.name}
                    </Link>
                ))
            }
        </div>
    );
}

export default GuestNavLinks;