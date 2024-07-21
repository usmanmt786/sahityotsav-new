"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { ZiqxAuth } from "ziqx";
import APPCONFIGS from "@/configs";
import { isDev } from "@/functions/utils/debug";


const SaveToken = ({token}:{ token:any}) => {
    useEffect(() => {

        if (token) {
            Cookies.set("token", token);
            window.location.replace("/admin");
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