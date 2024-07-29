"use client";

import Constants from "@/data/constants";
import EditResultPoster from "./EditPoster";
import { useState } from "react";

const PostersGrid = ({ posters }: { posters: any }) => {
    const [curPoster, setCurPoster] = useState(null);
    return (
        <div>
            <div className="grid lg:grid-cols-4 gap-8">
                {
                    posters.map((ps: any) => {
                        return <div key={ps.id}
                            onClick={() => setCurPoster(ps)}
                            className="cursor-pointer"
                        >
                            <img src={`${Constants.DRIVE_URL}uploads/${ps.file_name}`} className="rounded-lg border" alt="" />
                        </div>
                    })
                }
            </div>
            <EditResultPoster poster={curPoster} onHide={() => setCurPoster(null)} />
        </div>
    );
}

export default PostersGrid;