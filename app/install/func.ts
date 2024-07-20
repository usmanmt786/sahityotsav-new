"use server";

import InstallModel from "@/models/install/install_model";

export default async function install() {
    const resp = await InstallModel.install();
   
    return resp.code;
}