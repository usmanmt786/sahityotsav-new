
import APPCONFIGS from "@/configs";
import Constants from "@/data/constants";


const HomeHero = ({configs}:{configs:any}) => {
    const imgUrl = configs?.heroBg?.length>3?`${Constants.SITE_IMG_URL}${configs?.heroBg}`:null;

    const style = imgUrl? {backgroundImage: `url(${imgUrl})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
} : {
        background: APPCONFIGS.style.heroColor??"#30352D"
    };
    return (
        <div className=" h-[89vh] py-20 fullcenter relative "
        style={style}
        >
           {imgUrl &&  <div className="absolute top-0 bottom-0 right-0 left-0 bg-opacity-40 bg-black"></div> }
            
            <section className="commonwidth grid lg:grid-cols-2">
                <div className="fullcenter order-2 lg:order-1">
                    <img src="/images/ssf-w.png" className="z-[999] h-10 mb-1" alt="" />
                    <h2 className="uppercase font-bold text-center text-white text-2xl mb-5"
                    data-aos="zoom-in"
                    >{configs.typeName} {APPCONFIGS.type}</h2>
                    <img src="/images/logo-w.svg" 
                    className="h-20"
                    data-aos="zoom-in"
                    data-aos-delay="200"
                    alt="" />
                    <h6 className="my-3 bg-white px-5 py-2 rounded" data-aos="fade-up" data-aos-delay="400">{configs.venueDates}</h6>
                    <h5 className="text-xl font-thin text-white" data-aos="fade-up" data-aos-delay="600">
                        
                        @   {configs.venue}</h5>
                    </div>
                <div className="flex justify-center order-1 lg:order-2"
                data-aos="fade-right"
                >
                    <img src="/images/31.png" className="w-32 lg:w-52 mb-16 lg:mb-0" alt="" />
                </div>
            </section>
        </div>
    );
}

export default HomeHero;