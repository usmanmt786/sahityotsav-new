"use server";

import { ConfigsModel } from "@/models/configs/configs_model";
import { revalidatePath } from "next/cache";


export async function  updateLiveConfigs(live1:string, live2:string, live3:string) {

    let resp = {code:1, message:"Not Updated"};
    resp = await ConfigsModel.updateConfig('live1', live1);
    resp = await ConfigsModel.updateConfig('live2', live2);
    resp = await ConfigsModel.updateConfig('live3', live3);
    if(resp.code===0){
      revalidatePath('/admin/live');
    }
      return resp;

    
}