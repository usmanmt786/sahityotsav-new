import prisma from "@/data/prisma";


export default class CategoryModel{
    static async getAllCats(){
        const resp = await prisma.category.findMany();
        return resp??[];
    }
}