"use server";

import short from "short-uuid";
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path'
import PosterModel from "@/models/posters/poster_model";
import { revalidatePath } from "next/cache";

export async function uploadImage(data: FormData) {

  try {

    const file: File | null = data.get('file') as unknown as File
    if (!file) {
      throw new Error('No file uploaded')
    }


    const randomName = short.generate();
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const ext = file.name.split('.').pop()
    const fileName = `${randomName}.${ext}`;

    const uploadPath = join(process.cwd(), 'public', 'assets', 'posters');
    const filePath = join(uploadPath, fileName);

    await mkdir(uploadPath, { recursive: true });

    await writeFile(filePath, buffer)

    return { success: true, file: fileName }
  } catch (error) {
    console.error(error);
    return { success: false };

  }



}

export async function addPoster(image: string,configs:{ theme: string, x: number, y: number}) {
  const resp = await PosterModel.createPoster(image, configs.theme, configs.x, configs.y);
  if(resp){
    revalidatePath("/admin/posters");
  }
  return resp;

}