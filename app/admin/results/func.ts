"use server";

import ResultModel from "@/models/results/result_model";

export async function getParticipationsResult(programId:number){
    const resp = await ResultModel.getResults(programId);
    
    return resp
     }


     export async function updateResult(participationId:number, winPlace:number, score:number,grade?:string){
        const resp = await ResultModel.updateResult(participationId,winPlace,score,grade);
        return resp;
         }
    