import Link from "next/link";
import AOSClient from "../common/AOSClient";
import APPCONFIGS from "@/configs";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Footer from "../common/Footer";

const AdminLayout = (props:any) => {
   
    return (
        <div>
            <AOSClient/>
            <section className="bg-primary py-4 " data-aos="fade-down">
                <nav className="flex justify-between items-center commonwidth">
                    <Link href={`/admin`} className="flex items-center">
                    <MdOutlineAdminPanelSettings className="text-4xl mr-2"/>
                    <h5 className=" font-bold text-lg ">Admin Panel</h5>

                    </Link>
                   
                    <h6 className="text-lg uppercase font-bold">
                        {APPCONFIGS.typeName} {APPCONFIGS.type}
                    </h6>
                </nav>
            </section>
            {props.children}
            <Footer/>
        </div>
    );
}

export default AdminLayout;