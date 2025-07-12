"use server";

import AdvertisementModel from "@/models/advertisements/advertisement_model";
import ResultModel from "@/models/results/result_model";
import ResultModelV2 from "@/models/results/result_results_v2";

export interface ProgramResult {
  chNo: string;
  name: string;
  team: string;
  prize?: 1 | 2 | 3;
  grade?: string;
  points?: number;
}

export interface ExtractedProgramData {
  resultCount: number;
  category: string;
  program: string;
  firstPrize: ProgramResult[];
  secondPrize: ProgramResult[];
  thirdPrize: ProgramResult[];
  others: ProgramResult[];
}
export async function getParticipationsResult(programId: number) {
  const resp = await ResultModel.getResults(programId);

  return resp;
}

export async function updateResult(
  participationId: number,
  winPlace: number,
  score: number,
  grade?: string
) {
  const resp = await ResultModel.updateResult(
    participationId,
    winPlace,
    score,
    grade
  );
  return resp;
}

export async function updateResultAll(result: ExtractedProgramData) {
  const resp = await ResultModel.updateResultAll(result);
  return resp;
}



interface Winner {
  chNo: string;
  name: string;
  team: string;
}
 export interface Winners {
  firstPrize: Winner[];
  secondPrize: Winner[];
  thirdPrize: Winner[];
}
export interface Result {
  id: number;
  category: string;
  program: string;
  resultCount: number;
  firstPrize: Winner[];
  secondPrize: Winner[];
  thirdPrize: Winner[];
  advertisement: string | null;
}
export async function getResult(programId: number) {
  const resp = await ResultModelV2.getResultByProgram(programId);
  const winners: Winners = JSON.parse(resp.winners);

  return {
    id: resp.id,
    category: resp.category,
    program: resp.program,
    resultCount: resp.count,
    firstPrize: winners.firstPrize,
    secondPrize: winners.secondPrize,
    thirdPrize: winners.thirdPrize,
    advertisement: resp.advertisement,
  };
}
