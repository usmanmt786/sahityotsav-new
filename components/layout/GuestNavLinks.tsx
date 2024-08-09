"use client";

import Link from "next/link";
import Hamburger from 'hamburger-react'
import { useState } from "react";
import { useSignalEffect } from "@preact/signals-react";
import { configSignal } from "@/controller/configs";
import APPCONFIGS from "@/configs";
import { IoArrowForwardSharp } from "react-icons/io5";

const GuestNavLinks = () => {
    const ITEMS = [
        // {name:"About", link:"/about"},
        {name:"Videos", link:"/videos"},
        {name:"Live Stream", link:"/live"},
        {name:"Contact", link:"/contact"},


        
    ];

    const [isOpen, setOpen] = useState(false)


    const [configs, setConfigs] = useState<any>({});

    useSignalEffect(() => {
        setConfigs(configSignal.value);
    })


    return (
        <main>
            {/* ================================ DESKTOP  ====================================== */}

<section className="bg-primaryDark py-4 text-white" data-aos="fade-down">
                <nav className="commonwidth flex items-center justify-between">
                    <Link href={`/`}><img src="/images/icon-w.svg" className="h-14" alt="" /></Link>
                   
                    <div className="hidden lg:flex gap-x-4 lg:gap-x-8 items-center text-sm lg:text-base ">
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
            className="bg-white text-primaryDark px-4 font-bold py-2 rounded-lg" 
            >Results</Link>
        </div>

 {/* ================================ MOBILE  ====================================== */}
 <div className="lg:hidden">
                    <Hamburger toggled={isOpen} toggle={setOpen} />
                    </div>
        
                </nav>
            </section>

                    {
                        isOpen && <section className={` bg-white  fixed z-[9999] top-0 p-10 bottom-0 duration-500 ${isOpen ? "left-0" : "left-[-100%]"}`}
                        data-aos="fade-right"
                        >
                            <h5 className="uppercase">{configs?.typeName} {APPCONFIGS.type}</h5>
                          <h3 className="text-4xl font-thin pb-2 border-b-2">Sahityotsav</h3>
                            <div className="py-2">
                            {
                ITEMS.map((item)=>(
                    <Link 
                    href={item.link} 
                    key={item.name} 
                    className="hover:pl-5 duration-300 p-3 bg-gray-100
                     flex items-center rounded-lg border my-2">
                      <IoArrowForwardSharp className="text-primaryDark mr-2" />{item.name}
                    </Link>
                ))
            }
                            </div>
                            <Link href={'/results'}
            className="bg-gbg text-white px-2 py-3 rounded-lg flex justify-center ring-2 ring-primaryDark" 
            >Get Results</Link>

                        </section>
                    }
        </main>
    );
}

export default GuestNavLinks;