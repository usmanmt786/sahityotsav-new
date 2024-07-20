import AdminLayout from "@/components/layout/AdminLayout";

const Admin = (props:any) => {
    return (
        <AdminLayout>
           {props.children}
        </AdminLayout>
    );
}

export default Admin;