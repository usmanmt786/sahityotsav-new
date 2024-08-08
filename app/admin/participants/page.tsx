import DataTable from "@/components/widgets/datatable/DataTable";
import ParticipantModel from "@/models/partiticipants/participant_model";
import AddParicipant from "./Add";
import EditParticipant from "./Edit";
import DeleteParticipant from "./Delete";
import TeamModel from "@/models/teams/team_model";

const Participants = async () => {

    const data = await ParticipantModel.getAllParticipants();
    const teams = await TeamModel.getAllTeam();
console.log(data);

    return (
        <main  className="commonwidth">
            <DataTable 
            title="Participants"
            type="participant"
            columns={[
                {label:"Name", value:"name"},
                {label:"Chest Number", value:"chest_no"},
                {label:"Team", value:"team.name"},
              
            ]} data={data}/>
          <AddParicipant teams={teams}/>
          <EditParticipant teams={teams}/>
          <DeleteParticipant/>
        </main>
    );
}

export default Participants ;