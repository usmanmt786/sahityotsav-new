import prisma from "@/data/prisma";


export default class ProgramModel{
    static async getAllPrograms(){
        const resp = await prisma.program.findMany(
            {
                select:{
                    id:true,
                    name:true,
                    type:true,
                    stageType:true,
                    no_of_participants:true,
                    category:{
                        select:{
                            id:true,
                            name:true
                        }
                    }
                },
                where:{
                    delete_status:false
                }
            }
        );
        return resp??[];
    }

    static async getByCatId(catId:number){
        try {
            const resp = await prisma.program.findMany({
                where:{
                    categoryId:catId
                }
            });
            return resp??[];
        } catch (error) {
            console.log(error);
            
            return [];
        }
    }

    static async addProgram( catId:number, name:string, type:string, stage:string, participants:number){
        try {
            await prisma.program.create({
                data:{
                    name,
                    type,
                    stageType:stage,
                    no_of_participants:participants,
                    category:{
                        connect:{
                            id:catId
                        }
                    }
                },

                
            });
            return {code:0, message:"Program Added"}
        } catch (error) {
            console.error(error);
            return {code:1, message:"Error adding Program"}
            
        }
    }


    static async updateProgram(id:number, catId:number, name:string, type:string, stage:string, participants:number){
        try {
            await prisma.program.update({
                where:{
                    id
                },
                data:{
                    name,
                    type,
                    stageType:stage,
                    no_of_participants:participants,
                    category:{
                        connect:{
                            id:catId
                        }
                    }
                },

                
            });
            return {code:0, message:"Program updated"}
        } catch (error) {
            console.error(error);
            return {code:1, message:"Error updating Program"}
            
        }
    }


    static async deleteProgram(id:number){
        try {
            await prisma.program.update({
                where:{
                    id
                },
                data:{
                    delete_status:true
                }
            });
            return {code:0, message:"Program deleted"}
        } catch (error) {
            console.error(error);
            return {code:1, message:"Error deleting Program"}
            
        }
    }
}