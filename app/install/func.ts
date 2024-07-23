"use server";

import InstallModel from "@/models/install/install_model";
import { AuthModel } from "@/models/users/auth";
import UserModel from "@/models/users/user_model";

export default async function install() {
    const resp = await InstallModel.install();
    return resp.code;
}

export async function createUser(){
    const decoded:any  = AuthModel.decodeToken();
    if(!decoded) return false;
    const name = decoded.fullname??"";
    const uid = decoded.uid;
     
    const resp = await UserModel.createUser(name,uid,"admin");
    if(resp.code===0) return true;
    return false;
}
