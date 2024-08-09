import GuestLayout from "@/components/layout/GuestLayout";
import CoreConfigs from "@/models/configs/core_configs_model";
import LiveScreen from "./LiveScreen";
import { BsBroadcast } from "react-icons/bs";

const LiveIndex = async() => {
    const configs = await CoreConfigs.getLiveConfigs();
    const live1 = configs?.live1??'';
    const live2 = configs?.live2??'';
    const live3 = configs?.live3??'';

    return (<GuestLayout>
        <main className="commonwidth py-10 min-h-[80vh]">
           
           {
            !live1 && !live2 && !live3 ? <div className="fullcenter h-[40vh] border bg-gray-50">
                
                No Streaming Available Now</div> :
             <main>
                <section className="inline-flex bg-red-600 text-white items-center animate-pulse 
                gap-x-2 mb-2 border px-4 py-1 rounded-full cursor-pointer">
           <BsBroadcast className="text-xl "/> LIVE NOW
           </section>


                <section className="grid lg:grid-cols-2 gap-8 my-6">
                {live1 && <LiveScreen ytId={live1}/>}
                {live2 && <LiveScreen ytId={live2}/>}
                {live3 && <LiveScreen ytId={live3}/>}
             </section>
             </main>
           }
            
        </main>
      </GuestLayout>
    );
}

export default LiveIndex;
export const revalidate = 30;
