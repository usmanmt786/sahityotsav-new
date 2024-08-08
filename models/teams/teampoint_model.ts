import prisma from "@/data/prisma";


export default class TeamPointModel{
    static async getAllTeamPoints(){
        const resp = await prisma.team_point.findMany({
            select:{
                point:true,
                team_id:true
            }
        });
        const teams = await prisma.team.findMany();

        let finalItems = [];
        for(const item of teams){
            const point = resp.filter(x=>x.team_id==item.id).map(x=>x.point).reduce((a,b)=>a+b,0)
            const newItem = {
                ...item,
                point};
        
                finalItems.push(newItem);

        }
        finalItems.sort((a,b)=>b.point-a.point)
        return finalItems;
    }

    static async updatePoints(vals:{teamId:number, points:number}[]){
        try {
            for(const item of vals){
                const curPoint = await prisma.team_point.findFirst({
                    where:{
                        team_id:item.teamId
                    }
                });
                if(curPoint){
                    await prisma.team_point.update({
                        where:{
                            id:curPoint.id
                        },
                        data:{
                            point:item.points
                        }
                    });
                }else{
                    await prisma.team_point.create({
                        data:{
                            team_id:item.teamId,
                            point:item.points
                        }
                    });
                }
            }
            
            return true;
            
        } catch (error) {
            console.error(error);
            
            return false;
        }
    }



}