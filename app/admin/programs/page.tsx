import DataTable from "@/components/widgets/datatable/DataTable";
import ProgramModel from "@/models/programs/program_model";
import EditProgram from "./Edit";
import CategoryModel from "@/models/categories/category_model";
import AddProgram from "./Add";
import DeleteProgram from "./Delete";

const ProgramsHome = async () => {

    const data = await ProgramModel.getAllPrograms();
    const cats = await CategoryModel.getAllCats();

    return (
        <main  className="commonwidth">
            <DataTable 
            title="Programs"
            type="program"
            columns={[
                {label:"Name", value:"name", className:"text-sm"},
                {label:"Category", value:"category.name", className:"text-sm text-center"},
                {label:"Type", value:"type",className:"capitalize text-sm text-center"},
                {label:"Stage Type", value:"stageType",className:"capitalize text-sm text-center"},
                {label:"Participants", value:"no_of_participants"},

              
            ]} data={data}/>
          <EditProgram cats={cats}/>
          <AddProgram cats={cats}/>
          <DeleteProgram/>
          <div className="text-left"></div>
        </main>
    );
}

export default ProgramsHome