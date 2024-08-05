"use server";

import TeamModel from "@/models/teams/team_model";
import { revalidatePath } from "next/cache";

export async function addTeam(name:string, code?:string){
    const data =  await TeamModel.addTeam(name, code);
if(data.code===0){
    revalidatePath("/admin/teams");
}
    return data;
}

export async function updateTeam(id:number,name:string, code?:string){
    const data =  await TeamModel.updateTeam(id,name, code);
if(data.code===0){
    revalidatePath("/admin/teams");
}
    return data;
}