
import prisma from "@/data/prisma";


export default class UserModel{

  static async getAllUsers(){
    try {
      const finalData:{id:number,name:string,role:string, status:string}[] = [];
     const users = await prisma.user.findMany();
     const invited = await prisma.user_invitation.findMany();
     users.map((user)=>{
        finalData.push({
          id: user.id,
          name: user.name,
          role: user.role,
          status: "Active"
         
        });
     })
     invited.map((user)=>{
        finalData.push({
          id: user.id,
          name: user.email,
          role: user.role,
          status: "Invited"
        });
     })
  
      return finalData
    } catch (error) {
      console.error(error);
      return [];
      
    }
  }
  static async  createUser(name:string,ziqxUid:string,role:string) {
    try {
     const current =  await prisma.user.findMany({
        where:{
          ziqx_id:ziqxUid
        }
      });

      if(current.length>0){
        return {code: 1, message: "User already exist"}
      }
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


  static async  updateUser(id:number, role:string) {
    try {
      const admins = await this.curAdmins();

      if(admins.length<2 && role!=="admin"){
        return {code:1, message:"Must have at least 1 admin"}
      }
      await prisma.user.update({
        where:{
          id
        },
        data:{
          role
        }
      });
      return {code:0, message:"User updated"}
    } catch (error) {
      console.error(error);
      return {code:1, message:"Error updating user"}
      
    }
}

static async curAdmins(){
 return await prisma.user.findMany({
    where:{
      role: "admin"
    }
  })
}

  static async deleteUser(id:number){
    try {
      const admins = await this.curAdmins();

      if(admins.length<2){
        return {code:1, message:"Must have at least 1 admin"}
      }
      
      await prisma.user.delete({
        where:{
          id
        }
       
      });
      return {code:0, message:"User deleted"}
    } catch (error) {
      console.error(error);
      return {code:1, message:"Error deleting user"}
      
    }
  }
}