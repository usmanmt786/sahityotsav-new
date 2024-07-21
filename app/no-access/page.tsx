import GuestLayout from "@/components/layout/GuestLayout";
import Link from "next/link";
import { IoBan } from "react-icons/io5";

const NoAccess = () => {
    return (
        <GuestLayout>
            <main className="h-[70vh] fullcenter select-none">
            <IoBan className="text-6xl text-primary my-3" />

                <h1 className="text-xl">Unauthorized Access</h1>
                <p className="text-gray-400 text-sm">
                    Unfortunately, you do not have permission to access this page.
                </p>
                <div className="my-6">
                    <Link href={'/auth'}
                    className="bg-primaryDark text-white px-6  py-3 rounded-md shadow-xl"
                    >Login</Link>
                </div>
            </main>
        </GuestLayout>
    );
}

export default NoAccess;