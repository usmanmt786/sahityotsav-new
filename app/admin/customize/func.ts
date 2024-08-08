"use server";

import Constants from "@/data/constants";
import { ConfigsModel } from "@/models/configs/configs_model";
import { revalidatePath } from "next/cache";

export async function uploadCustomizeImage(data: FormData) {

    try {
  
     const resp = await fetch(`${Constants.DRIVE_URL}upload/site`,
      {
      method: 'POST',
      body: data
     });
  
     const json = await resp.json();   

     if(json && json?.files && json?.files?.length>0){
      return json?.files[0]?.name;
     }
     return null;
  
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  
  }


  export async function  updateBrochure(fileName:string) {

    let resp = {code:1, message:"Not Updated"};

     resp =   await ConfigsModel.updateConfig('brochure', fileName);

    if(resp.code===0){
      revalidatePath('/admin/customize');

    }
      return resp;

    
}