import DataTable from "@/components/widgets/DataTable";
import ProgramModel from "@/models/programs/program_model";

const ProgramsHome = async () => {

    const data = await ProgramModel.getAllPrograms();

    return (
        <main  className="commonwidth">
            <DataTable 
            title="Programs"
            addBtnText="Program"
            columns={[
                {label:"Name", value:"name"},
                {label:"Category", value:"category.name"},
              
            ]} data={data}/>
          
        </main>
    );
}

export default ProgramsHome;