"use server";

import Constants from "@/data/constants";

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
     
     return json;
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  
  }