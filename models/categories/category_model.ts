import prisma from "@/data/prisma";


export default class CategoryModel{
    static async getAllCats(){
        const resp = await prisma.category.findMany();
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
            }
        });
        return resp??[];
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
}