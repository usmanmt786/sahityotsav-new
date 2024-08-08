import APPCONFIGS from "@/configs";
import Constants from "@/data/constants";

const BrochureDownload = ({configs}:{configs:any}) => {

    if(configs?.brochure && configs?.brochure.length>5){
        return <div className="commonwidth py-20">
            <h2 className="text-xl uppercase">{configs?.typeName} {APPCONFIGS.type}</h2>
            <h1 className="text-4xl font-extrabold">Sahityotsav Brochure</h1>
            <p className="text-gray-500">Get all the event details and schedule at your fingertips.</p>
            
            <div className="mt-6">
            <a href={`${Constants.DRIVE_URL}uploads/site/${configs?.brochure}`}
            target="_blank"
            className="bg-primaryDark text-white px-6  py-3 rounded-md shadow-xl"
            >
            Download Brochure
            </a>
            </div>
        </div>
    }
    return (
        <>
            
        </>
    );
}

export default BrochureDownload;