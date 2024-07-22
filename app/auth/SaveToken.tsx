"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { ZiqxAuth } from "ziqx";
import APPCONFIGS from "@/configs";
import { isDev } from "@/functions/utils/debug";


const SaveToken = ({redir,token}:{redir:any, token:any}) => {
    useEffect(() => {
        if(redir){            
            Cookies.set("redir", redir);
        }
        if (token) {
            Cookies.set("token", token);

            const redirData = Cookies.get("redir");           
            
            if(redirData){
                window.location.replace(redirData);
                setTimeout(()=>Cookies.remove("redir"), 1000);
            }else{
                window.location.replace("/admin");
            }


        } else {
            setTimeout(() => {
                const auth = new ZiqxAuth();
                auth.login(APPCONFIGS.ziqx.appkey,isDev())
            }, 1000);
        }
    },[])
    return (
        <>
          
        </>
    );
}

export default SaveToken;