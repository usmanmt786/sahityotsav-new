import GuestLayout from "@/components/layout/GuestLayout";

const NoAccess = () => {
    return (
        <GuestLayout>
            <main className="h-[70vh] fullcenter">
                <h1>Unauthorized Access</h1>
                <p>
                    Unfortunately, you do not have permission to access this page.
                </p>
            </main>
        </GuestLayout>
    );
}

export default NoAccess;