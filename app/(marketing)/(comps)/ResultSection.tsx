
import APPCONFIGS from "@/configs";
import Constants from "@/data/constants";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const ResultSection = ({configs}:{configs:any}) => {
  const imgUrl = configs?.resultImage?.length>3?`${Constants.SITE_IMG_URL}${configs?.resultImage}`:"/images/result.png";

    return (
        <div className="bg-primary text-white ">
            <section 
            className="commonwidth py-20 grid lg:grid-cols-2">
              <div className="flex flex-col justify-center items-center lg:items-start">
              <h1 className="text-xl"  data-aos="fade-up" data-aos-delay="200">Get Live Results of</h1>
              <h2 className="uppercase text-2xl font-bold"  data-aos="fade-up"  data-aos-delay="400">{configs.typeName} {APPCONFIGS.type}</h2>
              <h4 className="text-4xl font-thin"  data-aos="fade-up"  data-aos-delay="600">Sahityotsav {APPCONFIGS.year}</h4>
              <div className="mt-4"  data-aos="fade-up"  data-aos-delay="800">
              <Link href={'/results'} className="px-4 py-3 text-white rounded inline-flex items-center gap-x-3 group"
               style={{
                background: APPCONFIGS.style.heroColor??"#30352D"
            }}
              >Check Results
              <FaArrowRight className="group-hover:translate-x-1 duration-300"/>

              </Link>
             
              </div>
              </div>
              <div className=" mt-10 lg:mt-0 flex justify-center lg:justify-start">
                <img src={imgUrl} className="w-[50vh] rounded-xl" alt="" />
              </div>
            </section>
        </div>
    );
}

export default ResultSection;