"use client";

import APPCONFIGS from "@/configs";
import toast from "react-hot-toast";
import { MdContentCopy } from "react-icons/md";

const InvitationLink = () => {
    const link = `https://${APPCONFIGS.domain}/invitaion`;
    return (
        <section className="p-5 bg-primary bg-opacity-30  mt-6 mb-3 ring-2 ring-primaryDark inline-block">
        <h4 className="text-xl font-bold">Note</h4>
        Invited user can accept the invitation using the following link
        <h6 
        onClick={()=>{
            navigator.clipboard.writeText(link);
            toast.success("Link Copied");
        }}
        className="text-blue-600 flex items-center gap-x-2 cursor-pointer">{link}
            <MdContentCopy/>
        </h6>
      </section>
    );
}

export default InvitationLink;