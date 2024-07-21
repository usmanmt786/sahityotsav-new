import APPCONFIGS from "@/configs";
import { FaYoutube } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";

const FooterSocials = () => {
    const SOCIAL_LINKS = [
        {name: "Youtube", link:APPCONFIGS.socials?.youtube, icon: <FaYoutube/>},
        {name: "Facebook", link:APPCONFIGS.socials?.facebook,  icon: <FaFacebook/>},
        {name: "Instagram", link:APPCONFIGS.socials?.instagram,  icon: <FaInstagram/>},
        {name: "Twitter", link:APPCONFIGS.socials?.twitter,  icon: <FaXTwitter/>},
    ];
    return (
        <section>

            <div className="flex gap-3">
            {
                SOCIAL_LINKS.filter((item)=>item.link).map((item, index)=>{
                    return (
                        <a href={item.link} 
                        target="_blank"
                        className=" text-xl h-10 w-10 bg-black text-white fullcenter  rounded-lg cursor-pointer " 
                        key={index}>
                            {item.icon}
                           
                        </a>
                    )   
                })
            }
            </div>
           
        </section>
    );
}

export default FooterSocials;