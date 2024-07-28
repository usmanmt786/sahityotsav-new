import CategoryModel from "@/models/categories/category_model";
import ProgramCatItems from "./ProgramCatItems";

const ProgramListIndex = async () => {
    const cats = await CategoryModel.getCatsWithPrograms();
    

    return (
        <div className="commonwidth">
       <ProgramCatItems items={cats} />
        </div>
    );
}

export default ProgramListIndex;