import APPCONFIGS from "@/configs";
import FooterSocials from "./FooterSocials";

const Footer = () => {
    return (
        <footer className="py-10 bg-primary bg-opacity-10 border-t-8 border-t-primary">
            <div className="  commonwidth flex justify-between ">
            <section>
                <img src="/images/ssf.png" className="h-8" alt="" />
                <h2 className="font-bold uppercase my-1">{APPCONFIGS.typeName} {APPCONFIGS.type}</h2>

            </section>
            <section>
                <FooterSocials/>
            </section>
           
        </div>
        <div className="mt-5 text-sm text-center">
                <a href="https://ziqx.cc" className="block">⚡ziqx.cc</a>

            </div>
        </footer>
    );
}

export default Footer;