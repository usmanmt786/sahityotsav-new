"use server";

import { ConfigsModel } from "@/models/configs/configs_model";
import { revalidatePath } from "next/cache";


export async function  updateConfigs(values:{k:string, v:string}) {
  console.log("Inside Server Function==>",values);

    let resp = {code:1, message:"Not Updated"};
    for (const [key, value] of Object.entries(values)) {
      console.log("Now Updating==>",key,' With=> ',value);
      
      const singleRes =   await ConfigsModel.updateConfig(key, value);
      resp = singleRes;
    }
    if(resp.code===0){
      revalidatePath('/admin/configs');

    }
      return resp;

    
}