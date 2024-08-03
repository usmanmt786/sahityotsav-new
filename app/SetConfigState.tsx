"use client";

import { configSignal } from "@/controller/configs";
import { useEffect } from "react";


const SetConfigState = ({configs}:{configs:any}) => {

    useEffect(()=>{
        if(configs){
            configSignal.value = configs;
        }
    }, [configs])
    return (
        <>
            
        </>
    );
}

export default SetConfigState;