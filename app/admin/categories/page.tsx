import DataTable from "@/components/widgets/DataTable";
import CategoryModel from "@/models/categories/category_model";

const CategoriesHome = async () => {

    const cats = await CategoryModel.getAllCats();

    return (
        <main  className="commonwidth">
            <DataTable 
            title="Categories"
            addBtnText="Category"

            columns={[
                {label:"Name", value:"name"},
              
            ]} data={cats}/>
          
        </main>
    );
}

export default CategoriesHome;