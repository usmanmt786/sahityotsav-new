import Link from "next/link";
import AOSClient from "../common/AOSClient";
import GuestNavLinks from "./GuestNavLinks";
import Footer from "../common/Footer";

const GuestLayout = (props:any) => {
   
    return (
        <div>
            <AOSClient/>
            <GuestNavLinks/>
           
            {props.children}
            <Footer/>
        </div>
    );
}

export default GuestLayout;