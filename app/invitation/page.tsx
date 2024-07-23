import GuestLayout from "@/components/layout/GuestLayout";
import { AuthModel } from "@/models/users/auth";
import InviteUserModel from "@/models/users/invite_model";
import UserModel from "@/models/users/user_model";
import Link from "next/link";
import { FaRegEnvelopeOpen } from "react-icons/fa";
import { LuMailCheck, LuMailX } from "react-icons/lu";

const Invitation = async () => {
    const decoded:any = AuthModel.decodeToken();

    if(decoded===null){
        return (
            <GuestLayout>
                <main className="fullcenter min-h-[70vh] text-center">
                <FaRegEnvelopeOpen className="text-7xl text-primary" />

                    <div className="my-4">

                    Please login to accept invitation 
                    </div>
                <Link href={'/auth/?next=invitation'}
                className="outline-btn"
                >Click to Login</Link>
                </main>
            </GuestLayout>
        ); 
    }

    const {email} = decoded;
    const invitation = await InviteUserModel.getInvByEmail(email);

    if(invitation===null){
        return (
            <GuestLayout>
                <main className="fullcenter min-h-[70vh] text-center">
                <LuMailX className="text-7xl text-primary" />

                    <div className="my-4">
                    We could not find invitation for this email
                    </div>
                <Link href={'/auth/?next=invitation'}
                className="outline-btn"
                >Login with another account</Link>
                </main>
            </GuestLayout>
        ); 
    }

    const uid = decoded.uid;
    const name = decoded.fullname??"";
    const role = invitation.role;

   await UserModel.createUser(name,uid,role);
    await InviteUserModel.deleteUser(invitation.id);
    
    return (
        <GuestLayout>
           <main className="fullcenter min-h-[70vh] text-center">
                <LuMailCheck className="text-7xl text-primary" />

                    <div className="my-4">
                    Invitation has been accepted successfully <br />

                    </div>
                <Link href={'/admin'}
                className="submit-btn gbg"
                >Continue to Dashboard</Link>
                </main>
        </GuestLayout>
    );
}

export default Invitation;