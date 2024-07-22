
import prisma from "@/data/prisma";


export default class UserModel{
  static async  createUser(name:string,ziqxUid:string,role:string) {
    try {
      await prisma.user.create({
          data:{
              name,
              ziqx_id:ziqxUid,
              role
          },
  
      });
  
      return {
          code: 0, message: "User created"}
    } catch (error) {
      console.error(error);
      return {code: 1, message: "Error creating user"}
      
    }
  
  
  
  }
}