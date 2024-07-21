import Link from "next/link";
import AOSClient from "../common/AOSClient";
import GuestNavLinks from "./GuestNavLinks";
import Footer from "../common/Footer";

const GuestLayout = (props:any) => {
   
    return (
        <div>
            <AOSClient/>
            <section className="bg-primaryDark py-4 text-white" data-aos="fade-down">
                <nav className="commonwidth flex items-center justify-between">
                    <Link href={`/`}><img src="/images/icon-w.svg" className="h-14" alt="" /></Link>
                    <GuestNavLinks/>
                </nav>
            </section>
            {props.children}
            <Footer/>
        </div>
    );
}

export default GuestLayout;