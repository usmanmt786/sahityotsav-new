import DataTable from "@/components/widgets/datatable/DataTable";
import TeamModel from "@/models/teams/team_model";
import AddTeam from "./AddTeam";
import EditTeam from "./EditTeam";

const Teams = async() => {
    const teams = await TeamModel.getAllTeam();
    return (
        <div className="commonwidth ">
             <DataTable
            title="Teams"
            type="team"
           
            columns={[
                {label:"Name", value:"name"},
                {label:"Code", value:"code"},
              
            ]} data={teams}/>
            <AddTeam/>
            <EditTeam/>
        </div>
    );
}

export default Teams;