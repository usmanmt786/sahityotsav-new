import CoreConfigs from "@/models/configs/core_configs_model";
import CustomizeForm from "./CustomizeForm";
import BroachureForm from "./BrochureForm";
import ContentChange from "./ContentChange";

const CustomizePage = async () => {
    const configs = await CoreConfigs.getCoreConfigs();
    return (
        <div className="commonwidth">
            <h1 className="text-2xl font-bold">Customize Site</h1>
            <section className="grid lg:grid-cols-2 gap-10">
            <CustomizeForm configs={configs}/>
          <section>
            <ContentChange confs={configs}/>
          <BroachureForm configs={configs}/>
          </section>
            </section>
        </div>
    );
}

export default CustomizePage;