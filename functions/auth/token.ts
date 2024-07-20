import { AuthModel } from "@/models/users/auth";
import { cookies } from "next/headers";

export function authToken(){
    const store = cookies();
    const token = store.get("token");

    if(token){
        return token.value;
    }else{
        return null;
    }
}

export function isLogged():boolean{
   const decoded:any = AuthModel.decodeToken();
   if(!decoded) return false;
   if(decoded.exp && decoded.exp < Date.now()/1000) return false;
   if(decoded.uid === null) return false;
   return true;

}