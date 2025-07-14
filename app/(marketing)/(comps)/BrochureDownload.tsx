import APPCONFIGS from "@/configs";
import Constants from "@/data/constants";

const BrochureDownload = ({configs}:{configs:any}) => {

    if(configs?.brochure && configs?.brochure.length>5){
        return <div className=" py-20 bg-primary bg-opacity-25">
            <section className="commonwidth fullcenter text-center">
                <h2 className="text-xl uppercase text-primaryDark font-black">
                    {configs?.typeName} {APPCONFIGS.type}</h2>
            <h1 className="text-4xl font-extrabold">Sahityotsav Brochure</h1>
            <p className="text-gray-500">Get all the event details and schedule at your fingertips.</p>
            
            <div className="mt-6">
            <a href={`${Constants.DRIVE_URL}${configs?.brochure}`}
            target="_blank"
            className="bg-primaryDark text-white px-6 inline-flex text-xs lg:text-base  py-3 rounded-md shadow-xl"
            >
            Download Brochure
            </a>
            </div>

            </section>
          
        </div>
    }
    return (
        <>
            
        </>
    );
}

export default BrochureDownload;