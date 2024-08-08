import prisma from "@/data/prisma";


export default class TeamModel{
    static async getAllTeam(){
        const resp = await prisma.team.findMany();
        return resp??[];
    }


    static async   addTeam(name:string,  code?:string){
        try {
           await prisma.team.create({
                data:{
                    name,
                   code
                }
            });
            return {code:0, message:"Team created"}
        } catch (error) {
            console.error(error);
            
            return {code:1, message:"Error creating team"}
            
        }
    }

    static async updateTeam(id:number, name:string, code?:string){
        try {
            await prisma.team.update({
                where:{
                    id
                },
                data:{
                    name,
                    code
                }
            });
            return {code:0, message:"Team updated"}
        } catch (error) {
            console.error(error);
            return {code:1, message:"Error updating Team"}
            
        }
    }

    static async   deleteTeam(id:number){
        try {
           await prisma.team.update({
                where:{
                    id
                },
                data:{
                    delete_status:true
                }
            });
            return {code:0, message:"Team Deleted"}
        } catch (error) {
            console.error(error);
            
            return {code:1, message:"Error deleting Team"}
            
        }
    }
}