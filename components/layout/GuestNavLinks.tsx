"use client";

import Link from "next/link";

const GuestNavLinks = () => {
    const ITEMS = [
        // {name:"About", link:"/about"},
        {name:"Contact", link:"/contact"},
        
    ];
    return (
        <div className="flex gap-x-4 lg:gap-x-8 items-center text-sm lg:text-base ">
            {
                ITEMS.map((item)=>(
                    <Link 
                    href={item.link} 
                    key={item.name} 
                    className="text-white hover:-translate-y-1 duration-300 border-b-4 border-transparent hover:border-white">
                        {item.name}
                    </Link>
                ))
            }
            <Link href={'/results'}
            className="bg-white text-primaryDark px-2 py-2 rounded-lg" 
            >Results</Link>
        </div>
    );
}

export default GuestNavLinks;