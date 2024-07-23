import DataTable from "@/components/widgets/datatable/DataTable";
import ParticipantModel from "@/models/partiticipants/participant_model";
import AddParicipant from "./Add";
import EditParticipant from "./Edit";
import DeleteParticipant from "./Delete";

const Participants = async () => {

    const data = await ParticipantModel.getAllParticipants();

    return (
        <main  className="commonwidth">
            <DataTable 
            title="Participants"
            type="participant"
            columns={[
                {label:"Name", value:"name"},
                {label:"Chest Number", value:"chest_no"},
                {label:"Place", value:"place"},
                {label:"Father Name", value:"father_name"},
              
            ]} data={data}/>
          <AddParicipant/>
          <EditParticipant/>
          <DeleteParticipant/>
        </main>
    );
}

export default Participants ;