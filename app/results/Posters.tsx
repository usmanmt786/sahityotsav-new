import Constants from "@/data/constants";
import SinglePoster from "./SinglePoster";
import { useState } from "react";
import ZDialog from "@/components/common/ZDialog";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Posters = ({results,posters, }:{results:any, posters:any[], }) => {
    const [downloading, setDownloading] = useState(false);
    return (
        <div className="mb-8">
            <h1 className="text-2xl mb-6">Posters</h1>
            <section className="grid lg:grid-cols-3 gap-8">
                {
                    posters.map((ps: any) => {
                        
                        return (
                            <div key={ps.id}>
                                <SinglePoster 
                                id={ps.id}
                                theme={ps.theme}
                                result={results}
                                imageUrl={`${Constants.DRIVE_URL}uploads/posters/${ps.file_name}`}
                                x={ps.body_locx} y={ps.body_locy}
                                setDownloading={setDownloading}
                                />

                            </div>
                        )
                    })
                }
            </section>

            {
                <ZDialog
                visible={downloading}
                onHide={() => setDownloading(false)}
                header=""
                >
                    <div className="fullcenter py-20">
                        <AiOutlineLoading3Quarters className="text-5xl mb-4 animate-spin"/>
                       <h2 className="font-bold text-xl"> Downloading Result Poster</h2>
                    </div>
                </ZDialog>
            }
        </div>
    );
}

export default Posters;