import GuestLayout from "@/components/layout/GuestLayout";
import CategoryModel from "@/models/categories/category_model";
import ResultsSection from "./Results";
import PosterModel from "@/models/posters/poster_model";

const Results = async() => {
    const cats = await CategoryModel.getAllCats();
    const posters = await PosterModel.getResultPosters();

    return (
        <GuestLayout>
            <main className="min-h-[90vh] commonwidth overflow-hidden">
                <ResultsSection cats={cats} posters={posters}/>
            </main>
        </GuestLayout>
    );
}

export default Results;