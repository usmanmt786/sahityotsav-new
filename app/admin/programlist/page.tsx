import CategoryModel from "@/models/categories/category_model";
import SingleItem from "./ProgramCatItems";
import ProgramCatItems from "./ProgramCatItems";
import ParticipantModel from "@/models/partiticipants/participant_model";

const ProgramListIndex = async () => {
    const cats = await CategoryModel.getCatsWithPrograms();
    

    return (
        <div className="commonwidth">
       <ProgramCatItems items={cats} />
        </div>
    );
}

export default ProgramListIndex;