import GuestLayout from "@/components/layout/GuestLayout";
import CategoryModel from "@/models/categories/category_model";
import ResultsSection from "./Results";

const Results = async() => {
    const cats = await CategoryModel.getAllCats();

    return (
        <GuestLayout>
            <main className="min-h-[90vh] commonwidth">
                <ResultsSection cats={cats}/>
            </main>
        </GuestLayout>
    );
}

export default Results;