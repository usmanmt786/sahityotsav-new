import CategoryModel from "@/models/categories/category_model";
import Link from "next/link";
import CatProgramList from "./CatProgramList";
import ResultModelV2 from "@/models/results/result_results_v2";

const Results = async () => {
  const cats = (await CategoryModel.getAllCats()).map((item) => ({
    id: item.id,
    name: item.name,
  }));
  const results = await ResultModelV2.getResults();

  return (
    <div className="commonwidth">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl mb-4">Results</h1>
        <Link
          href={"/admin/results/add"}
          className="bg-primaryDark px-5 py-3 rounded-xl text-white"
        >
          Add Result
        </Link>
      </div>
      <CatProgramList cats={cats} results={results}/>
    </div>
  );
};

export default Results;
