import prisma from "@/data/prisma";


export default class ParticipantModel{
    static async getAllParticipants(){
        const resp = await prisma.participant.findMany(
            {
                where:{
                    delete_status:false
                },
                select:{
                    id:true,
                    name:true,
                    place:true,
                    chest_no:true,
                    team:{
                        select:{
                            id:true,
                            name:true
                        }
                    }

                }
            }
        );
        return resp??[];
    }

    static async   addParticipant(name:string,  team:number,  chestNo:string){
        try {
           await prisma.participant.create({
                data:{
                    name,
                   teamId:team,
                    chest_no:chestNo,
                    
                }
            });
            return {code:0, message:"Participant created"}
        } catch (error) {
            console.error(error);
            
            return {code:1, message:"Error creating participant"}
            
        }
    }

    static async   updateParticipant(id:number,name:string,  team:number,  chestNo:string){
        try {
           await prisma.participant.update({
            where:{
                id
            },
                data:{
                    name,
             team:{
                connect:{
                    id:team
                   
                    }
                
             }       ,
                    chest_no:chestNo,
                    
                }
            });
            return {code:0, message:"Participant Updated"}
        } catch (error) {
            console.error(error);
            
            return {code:1, message:"Error updating participant"}
            
        }
    }

    static async   deleteParticipant(id:number){
        try {
           await prisma.participant.update({
                where:{
                    id
                },
                data:{
                    delete_status:true
                }
            });
            return {code:0, message:"Participant Deleted"}
        } catch (error) {
            console.error(error);
            
            return {code:1, message:"Error deleting participant"}
            
        }
    }

}