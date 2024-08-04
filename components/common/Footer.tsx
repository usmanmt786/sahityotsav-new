"use client";

import APPCONFIGS from "@/configs";
import FooterSocials from "./FooterSocials";
import { useState } from "react";
import { useSignalEffect } from "@preact/signals-react";
import { configSignal } from "@/controller/configs";

const Footer = () => {

    const [configs, setConfigs] = useState<any>({});

    useSignalEffect(()=>{
        setConfigs(configSignal.value);
    })


    return (
        <footer className="pt-10 bg-primary bg-opacity-10 border-t-8 border-t-primary">
            <div className="  commonwidth flex justify-between ">
            <section>
                <img src="/images/ssf.png" className="h-8" alt="" />
                <h2 className="font-bold uppercase my-1">{configs.typeName} {APPCONFIGS.type}</h2>

            </section>
            <section>
                <FooterSocials configs={configs}/>
            </section>
           
        </div>
        <section className="bg-black text-white py-6 mt-5">
        <div className=" text-sm text-center">
            <span className="text-xs"> Powered by</span>
        <br />
       <b> State IT Cell • SSF Kerala</b>

            </div>
        </section>
        </footer>
    );
}

export default Footer;