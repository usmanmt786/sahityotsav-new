"use server";

import ProgramlistModel from "@/models/partiticipants/programlist_model";


export async function addParticipation(programId:number, participantId:number){
    const resp = await ProgramlistModel.addParticipant(programId,participantId);
    return resp
     }


 export async function getCurProgramParicipants(programId:number){
const resp = await ProgramlistModel.getAllParticipants(programId);

return resp
 }

 export async function getNonSelectedParicipants(programId:number){
    const resp = await ProgramlistModel.getNonSelectedParicipants(programId);
    
    return resp
     }