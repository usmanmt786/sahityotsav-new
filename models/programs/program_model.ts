import prisma from "@/data/prisma";


export default class ProgramModel{
    static async getAllPrograms(){
        const resp = await prisma.program.findMany(
            {
                select:{
                    name:true,
                    category:true
                }
            }
        );
        return resp??[];
    }

    static async updateProgram(id:number, catId:number, name:string, description:string){
        try {
            await prisma.program.update({
                where:{
                    id
                },
                data:{
                    name,
                    description,
                    
                    category:{
                        connect:{
                            id:catId
                        }
                    }
                },

                
            });
            return {code:0, message:"Category updated"}
        } catch (error) {
            console.error(error);
            return {code:1, message:"Error updating category"}
            
        }
    }
}