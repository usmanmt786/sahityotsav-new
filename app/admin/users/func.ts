"use server";

import ParticipantModel from "@/models/partiticipants/participant_model";
import InviteUserModel from "@/models/users/invite_model";
import UserModel from "@/models/users/user_model";
import { revalidatePath } from "next/cache";


export async function addUser(email:string, role:string){
    const resp = await InviteUserModel.inviteUser(email, role);
    if(resp.code===0){
        revalidatePath("/admin/users");
    }
    return resp;
}

export async function updateUser(id:number, isInvited:boolean, role:string){
    let resp;
    if(isInvited){
        resp = await InviteUserModel.updateUser(id, role);

    }else{
        resp = await UserModel.updateUser(id, role);
    }
    if(resp.code===0){
        revalidatePath("/admin/users");
    }
    return resp;
}

export async function deleteUser(id:number, isInvited:boolean){
    let resp;
    if(isInvited){
        resp = await InviteUserModel.deleteUser(id)

    }else{
        resp = await UserModel.deleteUser(id)
    }
    if(resp.code===0){
        revalidatePath("/admin/users");
    }
    return resp;
}