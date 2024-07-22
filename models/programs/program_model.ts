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
}