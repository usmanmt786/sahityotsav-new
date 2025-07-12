"use server";

import Constants from "@/data/constants";
import AdvertisementModel from "@/models/advertisements/advertisement_model";
import PosterModel from "@/models/posters/poster_model";
import { revalidatePath } from "next/cache";

export async function uploadAdImage(data: FormData) {
  try {
    const resp = await fetch(`${Constants.DRIVE_URL}upload/ads`, {
      method: "POST",
      body: data,
      headers: {
        "x-api-key": "98b606ef2031489296ceda17bc84d5ce",
      },
    });

    const json = await resp.json();

    return json;
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function addAd(image: string, name: string, subscription: number) {
  const resp = await AdvertisementModel.addAd({
    image,
    subscription,
    name,
  });
  if (resp) {
    revalidatePath("/admin/advertisements");
    revalidatePath("/results");
  }
  return resp;
}

export async function updateAd(
  id: number,
  name: string,
  image: string,
  subscription: number
) {
  const resp = await AdvertisementModel.updateAd(id, {
    image,
    name,
    subscription,
  });
  if (resp) {
    revalidatePath("/admin/advertisements");
    revalidatePath("/results");
  }
  return resp;
}

export async function deleteAd(id: number) {
  const resp = await AdvertisementModel.deleteAd(id);
  if (resp) {
    revalidatePath("/admin/posters");
    revalidatePath("/results");
  }
  return resp;
}
