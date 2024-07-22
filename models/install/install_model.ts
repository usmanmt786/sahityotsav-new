import { COMMON_CATEGORIES, COMMON_PROGRAMS } from "@/data/prefill";
import prisma from "@/data/prisma";
import { ConfigsModel } from "../configs/configs_model";

export default class InstallModel {
    static async isInstalled():Promise<boolean> {
        const resp = await prisma.config.findFirst({
            where: {
                name: "is_installed"
            }
        });
        return resp?.value === "true";

    }


    static async install() {
       try {
        const isDone = await this.isInstalled();
        if(!isDone){
             await prisma.category.createMany({
                data: COMMON_CATEGORIES
            })

            await prisma.program.createMany({
                data: COMMON_PROGRAMS
            });

            await ConfigsModel.updateConfig("is_installed", "true");
         
            return {code:0, message:"Software installed"}
               }else{
            return {code:1, message:"Software is already installed"}
        }
       } catch (error) {
        console.error(error);
        
        return {code:1, message:"Error installing software"}
       }

    }

    static async uninstall() {
    
            await prisma.config.updateMany({
                data:{
                    value:"false"
                },
                where: {
                    name: "is_installed"
                }
            });
            await prisma.program.deleteMany();
            await prisma.category.deleteMany();
            await prisma.config.deleteMany();

            return {code:0, message:"Software uninstalled"}
            
        
    }
}
