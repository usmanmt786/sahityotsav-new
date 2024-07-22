"use client";

import ZDialog from "@/components/common/ZDialog";
import Link from "next/link";
import { IoMdLogIn } from "react-icons/io";


const LoginDialog = ({visible}:{visible:boolean}) => {
    return (
        <>
        <ZDialog
        visible={visible}
        onHide={()=>{}}
        header=""
        >
            <main className="fullcenter">
            <IoMdLogIn className="text-6xl" />

            <h2 className="my-2">Please login to install the system</h2>
            <Link href={`/auth?next=install`}
            className="px-4 py-3 bg-primaryDark text-white rounded"
            >Click to Login</Link>
            </main>
        </ZDialog>
            
        </>
    );
}

export default LoginDialog;