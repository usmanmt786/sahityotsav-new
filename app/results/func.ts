"use server";

import ProgramModel from "@/models/programs/program_model";
import ResultModel from "@/models/results/result_model";


export async function getProgramByCat(catId:number){
    const resp = await ProgramModel.getByCatId(catId);

    return resp;
    
}

export async function getWinResult(programId:number){
    const resp = await ResultModel.getWinResults(programId);
    return resp;


}