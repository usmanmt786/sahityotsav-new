"use server";
import AdvertisementModel from "@/models/advertisements/advertisement_model";
import ResultModelV2 from "@/models/results/result_results_v2";
import { revalidatePath } from "next/cache";

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
export async function addResult(data: ExtractedProgramData, ad?: number) {
  const winners = JSON.stringify({
    firstPrize: data.firstPrize.map((item: ProgramResult) => ({
      chNo: item.chNo,
      name: item.name,
      team: item.team,
    })),
    secondPrize: data.secondPrize.map((item: ProgramResult) => ({
      chNo: item.chNo,
      name: item.name,
      team: item.team,
    })),
    thirdPrize: data.thirdPrize.map((item: ProgramResult) => ({
      chNo: item.chNo,
      name: item.name,
      team: item.team,
    })),
  });
  const resultData = {
    category: data.category,
    program: data.program,
    winners,
    resultCount: data.resultCount,
    advertisement: ad,
  };
  const resp = await ResultModelV2.createResult(resultData);
  if (resp) {
    // Revalidate the results page to show the new result
    // This is a placeholder, actual revalidation logic may vary
    revalidatePath("/results");
    revalidatePath("/admin/results");
  }
  return resp;
}
export async function getActiveAdvertisements() {
  const resp = await AdvertisementModel.getActiveAds();
  return resp;
}
