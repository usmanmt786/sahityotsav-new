import AOSClient from "@/components/common/AOSClient";
import APPCONFIGS from "@/configs";

const HomeHero = () => {
    return (
        <div className=" h-[89vh] py-20 fullcenter"
        style={{
            background: APPCONFIGS.style.heroColor??"#30352D"
        }}
        >
            
            <section className="commonwidth grid lg:grid-cols-2">
                <div className="fullcenter order-2 lg:order-1">
                    <h2 className="uppercase font-bold text-center text-white text-2xl mb-5"
                    data-aos="zoom-in"
                    >{APPCONFIGS.typeName} {APPCONFIGS.type}</h2>
                    <img src="/images/logo-w.svg" 
                    className="h-20"
                    data-aos="zoom-in"
                    data-aos-delay="200"
                    alt="" />
                    <h6 className="my-3 bg-white px-5 py-2 rounded" data-aos="fade-up" data-aos-delay="400">{APPCONFIGS.venueDates}</h6>
                    <h5 className="text-xl font-thin text-white" data-aos="fade-up" data-aos-delay="600">
                        
                        @   {APPCONFIGS.venue}</h5>
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