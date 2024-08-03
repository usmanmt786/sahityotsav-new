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
        <footer className="py-10 bg-primary bg-opacity-10 border-t-8 border-t-primary">
            <div className="  commonwidth flex justify-between ">
            <section>
                <img src="/images/ssf.png" className="h-8" alt="" />
                <h2 className="font-bold uppercase my-1">{configs.typeName} {APPCONFIGS.type}</h2>

            </section>
            <section>
                <FooterSocials configs={configs}/>
            </section>
           
        </div>
        <div className="mt-5 text-sm text-center">
                <a href="https://ziqx.cc" className="block">⚡ziqx.cc</a>

            </div>
        </footer>
    );
}

export default Footer;