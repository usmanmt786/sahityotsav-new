
import prisma from "@/data/prisma";


export default class CoreConfigs {
    static async getCoreConfigs(){
        try {
            let configs:any = {
                typeName:"",
                venue:"",
                venueDates:"",
    youtube:"",
    facebook:"",
    instagram:"",
    twitter:"",
    contact1:"",
    contact2:"",
    venueLocation:""
            };

    const confs = await prisma?.config?.findMany();

    if(confs){
        confs.map((c)=>{
            configs[c.name] = c.value;
        })
    }
    return configs;
            
        } catch (error) {
            console.error(error);

           return {code:1, message:"Failed to get core configs"} 
        }
    }
}