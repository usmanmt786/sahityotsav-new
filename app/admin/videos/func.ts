"use server";

import VideoModel from "@/models/videos/video_model";
import { revalidatePath } from "next/cache";


export async function addVideo(title:string, ytId:string){
    const data =  await VideoModel.addVideo(title, ytId);
if(data.code===0){
    revalidatePath("/admin/videos");
}
    return data;
}

export async function updateVideo(id:number,title:string, ytId:string){
    const data =  await VideoModel.updateVideo(id,title, ytId);
if(data.code===0){
    revalidatePath("/admin/videos");
}
    return data;
}

export async function deleteVideo(id:number){
    const data =  await VideoModel.deleteVideo(id);
if(data.code===0){
    revalidatePath("/admin/videos");
}
    return data;
}