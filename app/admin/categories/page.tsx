import DataTable from "@/components/widgets/datatable/DataTable";
import CategoryModel from "@/models/categories/category_model";
import EditCategory from "./Edit";

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
            <EditCategory/>
          
        </main>
    );
}

export default CategoriesHome;