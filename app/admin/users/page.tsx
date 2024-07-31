import DataTable from "@/components/widgets/datatable/DataTable";
import AddUser from "./Add";
import EditUser from "./Edit";
import DeleteUser from "./Delete";
import UserModel from "@/models/users/user_model";
import InvitationLink from "./InvitationLink";


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
          <InvitationLink/>
        </main>
    );
}

export default Participants ;