"use server";

import InstallModel from "@/models/install/install_model";
import { AuthModel } from "@/models/users/auth";
import UserModel from "@/models/users/user_model";

export default async function install(xmlData: string) {
  const resp = await InstallModel.install(xmlData);
  return resp.code;
}
export async function uninstall() {
  const resp = await InstallModel.uninstall();
  return resp.code;
}

export async function createUser() {
  try {
    const decoded: any = AuthModel.decodeToken();
    if (!decoded) throw new Error("Token invalid");
    const name = decoded.fullname ?? "";
    const uid = decoded.uid;

    const resp = await UserModel.createUser(name, uid, "admin");    
    if (resp.code === 0) return true;
    throw new Error("Something went wrong");
  } catch (error) {
    console.log(error);
    await InstallModel.uninstall();
    return false;
  }
}
