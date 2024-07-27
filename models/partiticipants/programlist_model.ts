import prisma from "@/data/prisma";


export default class ProgramlistModel{
  static  async getAllParticipants(programId:number){
        const resp  = await prisma.program_participant.findMany({
            where:{
                programId
                
            },
        select:{
            id:true,
           participant:{
            select:{
                id:true,
                name:true,
                place:true,
                chest_no:true,
            }
           }
        }
        });
        return resp;
    }

    static async getNonSelectedParicipants(programId:number){
        const allParticipants  = await prisma.participant.findMany();
        const curParticipants  = await ProgramlistModel.getAllParticipants(programId);
        const resp  = allParticipants.filter(i=>!curParticipants.some(j=>j.participant?.id===i.id));
        return resp;
    }

    static async addParticipant(programId:number, participantId:number){
       try {
       await prisma.program_participant.create({
            data:{
                programId:programId,
                participantId:participantId,
                
            }
        });
        return true;
       } catch (error) {
        return false;
       }
    }
}