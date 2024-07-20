import { authToken } from "@/functions/auth/token"
import { jwtDecode } from "jwt-decode";
import prisma from "@/data/prisma";

export class AuthModel{
    static decodeToken(){
       try {
        const token = authToken();
        if(!token) return null;
        

        return jwtDecode(token);
       } catch (error) {
        return false;

       }

    }
    static async isAdmin():Promise<boolean>{
        const decoded:any = AuthModel.decodeToken();
        if(!decoded) return false;

        const uid = decoded.uid;
        if(!uid) return false;

        const res = await prisma.user.findFirst({
            where: {
                ziqx_id: uid
            }
        });
        return res?.role === "admin";
    }
}