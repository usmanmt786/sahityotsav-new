"use server";

import TeamPointModel from "@/models/teams/teampoint_model";
import { revalidatePath } from "next/cache";



export async function updateTeamPoint(data:any) {
    const keys = Object.keys(data);

    let newMap:{teamId:number, points:number}[] = [];

    for(const item of keys){
        newMap.push({teamId: parseInt(`${item}`), points: parseInt(`${data[item]}`) })
    }
    
    const resp  = await TeamPointModel.updatePoints(newMap);
    if(resp){
        revalidatePath('/admin/teampoint')
    }
    return resp;
}