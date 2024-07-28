import CategoryModel from "@/models/categories/category_model";
import CatProgramList from "./CatProgramList";

const Results = async() => {
    const cats = await CategoryModel.getCatsWithPrograms();

    return (
         <div className="commonwidth">
            <h1 className="text-2xl mb-4">Results</h1>
       <CatProgramList items={cats} />
        </div>
    );
}

export default Results;