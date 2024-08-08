import CoreConfigs from "@/models/configs/core_configs_model";
import EditLiveConfigs from "./EditConfigs";

const ConfigsPage = async () => {
    const configs = await CoreConfigs.getLiveConfigs();
    
    return (
        <div className="commonwidth">
           <div className="lg:w-6/12 mx-auto">
           <EditLiveConfigs confs={configs}/>
           </div>
        </div>
    );
}

export default ConfigsPage;