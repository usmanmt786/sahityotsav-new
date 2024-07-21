"use server";
import prisma from "@/data/prisma";


export async function createUser(name:string,ziqxUid:string,role:string) {
    const user = await prisma.user.create({
        data:{
            name:name,
            ziqx_id:ziqxUid,
        }
    });

}