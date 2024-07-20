import { COMMON_CATEGORIES, COMMON_PROGRAMS } from "@/data/prefill";
import prisma from "@/data/prisma";

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
        const isDone = await this.isInstalled();
        if(!isDone){
             await prisma.category.createMany({
                data: COMMON_CATEGORIES
            })

            await prisma.program.createMany({
                data: COMMON_PROGRAMS
            });

            await prisma.config.create({
                data: {
                    name: "is_installed",
                    value: "true"
                }
            })
            return {code:0, message:"Software installed"}
               }else{
            return {code:1, message:"Software is already installed"}
        }

    }
}
