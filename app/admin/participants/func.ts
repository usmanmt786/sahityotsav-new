"use server";

import ParticipantModel from "@/models/partiticipants/participant_model";
import { revalidatePath } from "next/cache";


export async function addParticipant(name:string,  place:string,  chestNo:string){
    const resp = await ParticipantModel.addParticipant(name,  place, chestNo);
    if(resp.code===0){
        revalidatePath("/admin/participants");
    }
    return resp;
}

export async function editParticipant(p:{
    id:number, name:string,  place:string,  chestNo:string,
}){
    const resp = await ParticipantModel.updateParticipant(p.id, p.name,  p.place, p.chestNo);
    if(resp.code===0){
        revalidatePath("/admin/participants");
    }
    return resp;
}

export async function deleteParticipant(id:number){
    const resp = await ParticipantModel.deleteParticipant(id);
    if(resp.code===0){
        revalidatePath("/admin/participants");
    }
    return resp;
}