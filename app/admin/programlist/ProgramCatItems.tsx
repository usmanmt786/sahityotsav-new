"use client";

import { getInitials } from "@/functions/utils/string";
import { useState } from "react";
import ZSideBar from "../../../components/common/ZSideBar";
import ViewProgramlist from "./ViewProgramlist";


const ProgramCatItems = ({ items,}: { items: any[],  }) => {
    const [current, setCurrent] = useState<any>(null);
    return (
        <div>
            <section className="grid lg:grid-cols-3 gap-6">
                {
                    items.map((item: any) => {
                        return (
                            <div
                                key={item.id}
                                className="border p-5 rounded cursor-pointer 
                                hover:ring-2 ring-primaryDark duration-300"
                                onClick={() => {
                                    setCurrent(item);
                                }}
                            >
                                <div
                                    className="bg-primaryDark fullcenter h-10 w-10 rounded-lg mb-2 text-white font-bold">
                                    {getInitials(item.name)}</div>
                                <h1 className="font-bold">{item.name}</h1>
                            </div>
                        )
                    })


                }
            </section>

            <ZSideBar
                visible={current !== null}
                onHide={() => setCurrent(null)}
                header={current?.name}
            >
                <ViewProgramlist
                    item={current} />

            </ZSideBar>
        </div>
    );
}

export default ProgramCatItems;

