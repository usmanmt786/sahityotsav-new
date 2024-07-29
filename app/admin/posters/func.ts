"use server";

import Constants from "@/data/constants";
import PosterModel from "@/models/posters/poster_model";
import { revalidatePath } from "next/cache";

export async function uploadImage(data: FormData) {

  try {

    const file: File | null = data.get('file') as unknown as File
    if (!file) {
      throw new Error('No file uploaded')
    }


   const resp = await fetch(`${Constants.DRIVE_URL}/upload`,{
    method: 'POST',
    body: data
   });

   const json = await resp.json();
   
   return json;
  } catch (error) {
    console.error(error);
    return { success: false };
  }

}

export async function addPoster(image: string,configs:{ theme: string, x: number, y: number}) {
  const resp = await PosterModel.createPoster(image, configs.theme, configs.x, configs.y);
  if(resp){
    revalidatePath("/admin/posters");
  }
  return resp;

}

export async function updatePosterTemplate(id: number,configs:{ theme: string, x: number, y: number}) {
  const resp = await PosterModel.updatePosterTemplate(id, configs.theme, configs.x, configs.y);
  if(resp){
    revalidatePath("/admin/posters");
  }
  return resp;

}

export async function deleteTemplate(id: number) {
  const resp = await PosterModel.deletePoster(id);
  if(resp){
    revalidatePath("/admin/posters"); 
  }
  return resp;

}