import APPCONFIGS from "@/configs";

const Footer = () => {
    return (
        <div className="bg-black py-10 fullcenter text-center text-white">
            <h2 className="font-bold">&copy; {APPCONFIGS.typeName} {APPCONFIGS.type} Sahityotsav</h2>
            <div className="mt-5 text-sm text-center">
                <a href="https://ziqx.cc" className="block">⚡ziqx.cc</a>

            </div>
        </div>
    );
}

export default Footer;