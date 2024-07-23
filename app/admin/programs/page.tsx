import DataTable from "@/components/widgets/datatable/DataTable";
import ProgramModel from "@/models/programs/program_model";
import EditProgram from "./Edit";

const ProgramsHome = async () => {

    const data = await ProgramModel.getAllPrograms();

    return (
        <main  className="commonwidth">
            <DataTable 
            title="Programs"
            type="program"
            columns={[
                {label:"Name", value:"name"},
                {label:"Category", value:"category.name"},
              
            ]} data={data}/>
          <EditProgram/>
        </main>
    );
}

export default ProgramsHome