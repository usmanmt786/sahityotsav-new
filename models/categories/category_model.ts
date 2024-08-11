import prisma from "@/data/prisma";


export default class CategoryModel{
    static async getAllCats(){
        const resp = await prisma.category.findMany({
            where:{
                delete_status:false
            }
        });
        return resp??[];
    }

    static async getCatsWithPrograms(){
        const resp = await prisma.category.findMany({
            select:{
                id:true,
                name:true,
                program:{
                    select:{
                        id:true,
                        name:true,
                        
                    }
                }
            },
            where:{
                delete_status:false
            }
        });
        return resp??[];
    }

    static async addCategory(name:string){
        try {
            await prisma.category.create({
              
                data:{
                    name,
                   
                }
            });
            return {code:0, message:"Category Created"}
        } catch (error) {
            console.error(error);
            return {code:1, message:"Error Creating category"}
            
        }
    }
    static async updateCategory(id:number, name:string, description:string){
        try {
            await prisma.category.update({
                where:{
                    id
                },
                data:{
                    name,
                    description
                }
            });
            return {code:0, message:"Category updated"}
        } catch (error) {
            console.error(error);
            return {code:1, message:"Error updating category"}
            
        }
    }

    static async deleteCategory(id:number){
        try {
            await prisma.category.update({
                where:{
                    id
                },
                data:{
                    delete_status:true
                }
            });
            return {code:0, message:"Category deleted"}
        } catch (error) {
            console.error(error);
            return {code:1, message:"Error deleting Category"}
            
        }
    }
}