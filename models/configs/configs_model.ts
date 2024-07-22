import prisma from "@/data/prisma";


export class ConfigsModel{
    static async updateConfig(key:string, value:string){
        try {
            const avail  = await prisma.config.findFirst({
                where: {
                    name: key
                }
            });
            if(avail){
                await prisma.config.updateMany({
                    where: {
                        name: key
                    },
                    data: {
                        value
                    }
                });
            }else{
                await prisma.config.create({
                    data: {
                        name: key,
                        value
                    }
                });
            }

            return {code:0, message:"Config updated"}
        } catch (error) {
            return {code:1, message:"Failed to Update Data"}

        }
    }
}