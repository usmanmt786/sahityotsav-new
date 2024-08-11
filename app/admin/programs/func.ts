"use server";

import ProgramModel from "@/models/programs/program_model";
import { revalidatePath } from "next/cache";



export async function addProgram(p:{
    catId:number,
    name:string,
    type:string,
    stageType: string,
    participants: number
    

} ){
    const data =  await ProgramModel.addProgram(p.catId, p.name, p.type, p.stageType, p.participants);
if(data.code===0){
    revalidatePath("/admin/programs");
    revalidatePath("/results");

}
    return data;
}


export async function editProgram(id:number,p:{
    catId:number,
    name:string,
    type:string,
    stageType: string,
    participants: number
    

} ){
    const data =  await ProgramModel.updateProgram(id,p.catId, p.name, p.type, p.stageType, p.participants);
if(data.code===0){
    revalidatePath("/admin/programs");
    revalidatePath("/results");

}
    return data;
}

export async function deleteProgram(id:number){
    const resp = await ProgramModel.deleteProgram(id);
    if(resp.code===0){
        revalidatePath("/admin/programs");
        revalidatePath("/results");

    }
    return resp;
}