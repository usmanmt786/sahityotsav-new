import AdminLayout from "@/components/layout/AdminLayout";
import { isAdminAuthorized } from "@/functions/auth/admin_validate";
import { FaBan } from "react-icons/fa";

const Admin = async(props:any) => {
    const isAdmin  = await isAdminAuthorized();
    return (
        <AdminLayout>
           <main className="min-h-[75vh] py-5">
            {isAdmin?props.children:<div className="min-h-[60vh] fullcenter">
                <FaBan className="text-6xl mb-3 text-red-300"/>
                <h1 className="text-xl">Unauthorized Access</h1></div> }
           
           </main>
        </AdminLayout>
    );
}

export default Admin;