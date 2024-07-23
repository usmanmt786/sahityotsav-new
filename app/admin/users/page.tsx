import DataTable from "@/components/widgets/datatable/DataTable";
import ParticipantModel from "@/models/partiticipants/participant_model";
import AddUser from "./Add";
import EditUser from "./Edit";
import DeleteUser from "./Delete";
import UserModel from "@/models/users/user_model";


const Participants = async () => {

    const data = await UserModel.getAllUsers();

    return (
        <main  className="commonwidth">
            <DataTable 
            title="Access Users"
            type="user"
            columns={[
                {label:"Name", value:"name"},
                {label:"Role", value:"role"},
                {label:"Status", value:"status"},
            ]} data={data}/>
          <AddUser/>
          <EditUser/>
          <DeleteUser/>
        </main>
    );
}

export default Participants ;