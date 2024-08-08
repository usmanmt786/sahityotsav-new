import prisma from "@/data/prisma";


export default class VideoModel{
    static async getAllVideos(){
        const resp = await prisma.ytvideo.findMany();
        return resp??[];
    }



    static async updateVideo(id:number, title:string,  ytId:string){
        try {
            await prisma.ytvideo.update({
                where:{
                    id
                },
                data:{
                   title,
                   yt_id:ytId
                }
            });
            return {code:0, message:"Video updated"}
        } catch (error) {
            console.error(error);
            return {code:1, message:"Error updating category"}
            
        }
    }

    static async   addVideo(title:string,  ytId:string){
        try {
           await prisma.ytvideo.create({
                data:{
                   title,
                   yt_id:ytId
                   
                }
            });
            return {code:0, message:"Video created"}
        } catch (error) {
            console.error(error);
            
            return {code:1, message:"Error creating Video"}
            
        }
    }



    static async   deleteVideo(id:number){
        try {
           await prisma.ytvideo.delete({
                where:{
                    id
                },
              
            });
            return {code:0, message:"Video Deleted"}
        } catch (error) {
            console.error(error);
            
            return {code:1, message:"Error deleting Team"}
            
        }
    }
}