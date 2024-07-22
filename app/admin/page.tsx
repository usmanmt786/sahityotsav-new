import Link from "next/link";
import { MENU_ITEMS } from "./Items";

const AdminHome = () => {
    
    return (
        <div className="commonwidth">
            <h1 className="text-3xl my-3">Admin Menu</h1>
            <section className="grid lg:grid-cols-4 gap-6">
            {
                MENU_ITEMS.map((item, index)=>{
                    return (
                        <Link key={index}
                        href={item.to}
                        className="fullcenter border px-5 py-8 rounded-xl hover:ring-2 ring-primaryDark duration-300 hover:text-primaryDark">
                            <h3 className="font-bold text-3xl">{item.icon}</h3>
                            <div>{item.name}</div>
                           </Link>
                    )
                })
                
            }
            </section>
        </div>
    );
}

export default AdminHome;