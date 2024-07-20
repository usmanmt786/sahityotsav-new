import Link from "next/link";
import AOSClient from "../common/AOSClient";
import GuestNavLinks from "./GuestNavLinks";

const GuestLayout = (props:any) => {
   
    return (
        <div>
            <AOSClient/>
            <section className="bg-primary py-4 text-white" data-aos="fade-down">
                <nav className="commonwidth flex items-center justify-between">
                    <Link href={`/`}><img src="/images/logo.svg" className="h-14" alt="" /></Link>
                    <GuestNavLinks/>
                </nav>
            </section>
            {props.children}
        </div>
    );
}

export default GuestLayout;