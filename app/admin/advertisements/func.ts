"use server";

import AdvertisementModel from "@/models/advertisements/advertisement_model";
import { revalidatePath } from "next/cache";

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
