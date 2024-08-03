import CoreConfigs from "@/models/configs/core_configs_model";
import EditConfigs from "./EditConfigs";

const ConfigsPage = async () => {
    const configs = await CoreConfigs.getCoreConfigs();
    return (
        <div className="commonwidth">
           <EditConfigs confs={configs}/>
        </div>
    );
}

export default ConfigsPage;