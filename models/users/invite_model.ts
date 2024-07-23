import prisma from "@/data/prisma";


export default class InviteUserModel{

    static async  inviteUser(email:string,role:string) {
        try {
            await prisma.user_invitation.create({
                data:{
                   email,
                   role,
                },
        
            });
        
            return {
                code: 0, message: "User Invitation created"}
          } catch (error) {
            console.error(error);
            return {code: 1, message: "Error creating user"}
            
          }
    }

    static async getInvByEmail(email:string){
        try {
          const users = await prisma.user_invitation.findMany({
            where:{
              email
            }
          });
          if(users.length>0){
            return users[0];
          }else{
            return null;
          }
          
        } catch (error) {
          return null;
          
        }
    }

    static async  updateUser(id:number, role:string) {
        try {
          await prisma.user_invitation.update({
            where:{
              id
            },
            data:{
              role
            }
          });
          return {code:0, message:"Invited User updated"}
        } catch (error) {
          console.error(error);
          return {code:1, message:"Error updating invited user"}
          
        }
    }

    static async deleteUser(id:number){
        try {
          await prisma.user_invitation.delete({
            where:{
              id
            }
           
          });
          return {code:0, message:"Invited User deleted"}
        } catch (error) {
          console.error(error);
          return {code:1, message:"Error deleting invited user"}
          
        }
      }
}