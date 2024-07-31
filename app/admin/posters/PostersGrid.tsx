"use client";

import Constants from "@/data/constants";
import EditResultPoster from "./EditPoster";
import { useState } from "react";

const PostersGrid = ({ posters }: { posters: any }) => {
    const [curPoster, setCurPoster] = useState(null);
    return (
        <div>
            <div className="grid lg:grid-cols-3 gap-8">
                {
                    posters.map((ps: any) => {
                        return <div key={ps.id}
                            onClick={() => setCurPoster(ps)}
                            className="relative cursor-pointer group  "
                        >

                            <img 
                            src={`${Constants.DRIVE_URL}uploads/posters/${ps.file_name}`} 
                            className="rounded-lg border" alt="" />
                            <div 
                            className="absolute top-0 bottom-0 right-0 left-0 bg-black/35 text-white text-2xl
                            rounded-lg fullcenter opacity-0 group-hover:opacity-100 duration-300 ">
                            Click to Preview
                            </div>
                        </div>
                    })
                }
            </div>
            <EditResultPoster poster={curPoster} onHide={() => setCurPoster(null)} />
        </div>
    );
}

export default PostersGrid;