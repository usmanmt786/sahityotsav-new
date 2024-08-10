import DataTable from "@/components/widgets/datatable/DataTable";
import AddUser from "./Add";
import EditUser from "./Edit";
import DeleteUser from "./Delete";
import UserModel from "@/models/users/user_model";
import InvitationLink from "./InvitationLink";
import UserItems from "./Items";
import { rowUpdateSignal } from "@/controller/row_actions";
import { MdAdd } from "react-icons/md";
import UsersHeader from "./Header";


const Participants = async () => {

    const data = await UserModel.getAllUsers();

    return (
        <main  className="commonwidth">
           <UsersHeader/>

            <UserItems users={data}/>
            
          <AddUser/>
          <EditUser/>
          <DeleteUser/>
          <br />
          <InvitationLink/>
        </main>
    );
}

export default Participants ;