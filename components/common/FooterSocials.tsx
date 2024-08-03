import { FaYoutube } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";

const FooterSocials = ({configs}:{configs:any}) => {
    const SOCIAL_LINKS = [
        {name: "Youtube", link:configs.youtube, icon: <FaYoutube/>},
        {name: "Facebook", link:configs.facebook,  icon: <FaFacebook/>},
        {name: "Instagram", link:configs.instagram,  icon: <FaInstagram/>},
        {name: "Twitter", link:configs.twitter,  icon: <FaXTwitter/>},
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