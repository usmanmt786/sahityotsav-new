import DataTable from "@/components/widgets/datatable/DataTable";
import CategoryModel from "@/models/categories/category_model";
import EditCategory from "./Edit";
import AddCategory from "./Add";
import DeleteCategory from "./Delete";

const CategoriesHome = async () => {

    const cats = await CategoryModel.getAllCats();

    return (
        <main  className="commonwidth">
            <DataTable
            title="Categories"
            type="category"
           
            columns={[
                {label:"Name", value:"name"},
              
            ]} data={cats}/>
            <EditCategory/>
            <AddCategory/>
            <DeleteCategory/>
          
        </main>
    );
}

export default CategoriesHome;