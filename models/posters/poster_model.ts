import prisma from "@/data/prisma";

export default class PosterModel {

    static async getResultPosters() {
        try {
            const resp = await prisma.posters.findMany();
            return resp;
            
        } catch (error) {
            console.error(error);
            return [];
            
        }
    }

    static async createPoster(filename: string, theme: string, x: number, y: number) {
        try {
             await prisma.posters.create({
                data:{
                    file_name: filename,
                    theme: theme,
                    body_locx: x,
                    body_locy: y,

                }
            });
            return true;
            
        } catch (error) {
            console.error(error);
            return false;
            
        }
    }

    static async updatePosterTemplate(id:number,theme: string, x: number, y: number){
        try {
            

         await prisma.posters.update(
                
                {
where:{
    id
},

               data:{
                   theme: theme,
                   body_locx: x,
                   body_locy: y,

               }
           });
           
           return true;
           
       } catch (error) {
           console.error(error);
           return false;
           
       } 
    }

    static async deletePoster(id:number){
        try {
            await prisma.posters.delete({where:{id}});
           return true;
           
       } catch (error) {
           console.error(error);
           return false;
           
       }  
    }
}