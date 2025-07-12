'use server'
import { Drivez } from "drivez";
const storage = new Drivez({
  accessKeyId: process.env.ACCESS_KEY || "",
  secretAccessKey: process.env.SECRET_KEY || "",
  accountId: process.env.ACCOUNT_ID || "",
  bucket: process.env.BUCKET_NAME || "",
});

export async function getPreSignedUrl(filePath: string) {
  return await storage.getSignedUrlForPut(filePath);
}
