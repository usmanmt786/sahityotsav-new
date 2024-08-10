
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
    venueLocation:"",
    heroBg:"",
    aboutImage:"",
    resultImage:"",
    homeAbout:"",
    brochure:""
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


    static async getLiveConfigs(){
        try {
            let configs:any = {
                live1:"",
                live2:"",
                live3:"",
  
            };

    const confs = await prisma?.config?.findMany({
        where:{
            name:{
                in:["live1", "live2", "live3"]
            }
        }
    });

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