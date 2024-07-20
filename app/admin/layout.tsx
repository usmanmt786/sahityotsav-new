import AdminLayout from "@/components/layout/AdminLayout";

const Admin = (props:any) => {
    return (
        <AdminLayout>
           <main className="min-h-[75vh] py-5">
           {props.children}
           </main>
        </AdminLayout>
    );
}

export default Admin;