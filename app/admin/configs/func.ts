"use server";

import { ConfigsModel } from "@/models/configs/configs_model";
import { revalidatePath } from "next/cache";


export async function  updateConfigs(values:{k:string, v:string}) {

    let resp = {code:1, message:"Not Updated"};
    for (const [key, value] of Object.entries(values)) {
      
      const singleRes =   await ConfigsModel.updateConfig(key, value);
      resp = singleRes;
    }
    if(resp.code===0){
      revalidatePath('/admin/configs');

    }
      return resp;

    
}