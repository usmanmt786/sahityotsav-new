
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { MdOutlinePostAdd, MdPerson } from "react-icons/md";
import { getParticipationsResult } from "./func";
import UpdateResult from "./UpdateResult";
import { LuBadge } from "react-icons/lu";
import { HiChevronRight } from "react-icons/hi";

const ViewResults = ({ item, }: { item: any, }) => {

    const [program, setProgram] = useState<any>(null);
    const [participation, setParticipation] = useState<any>(null);
    const [curEventParticipants, setCurEventParticipants] = useState<any[]>([]);

    async function getParticipants(prId: number) {
        if (prId) {
            const resp = await getParticipationsResult(prId);
            setCurEventParticipants(resp);
        }
    }

    return (
        <div>

            <section className="my-2 flex justify-between gap-4">
                <Dropdown
                    filter={true}
                    emptyMessage={"No Programs Found"}
                    options={item && item.program ? item.program : []}
                    optionLabel="name"
                    optionValue="id"
                    value={program}
                    onChange={(e) => {
                        setProgram(e.value);
                        getParticipants(e.value?.id)
                    }}
                    placeholder={"Select Program"}
                    className='zselect w-full'
                />

            </section>

            {
                !program ? <div className="h-[50vh] fullcenter">Please select a program</div> : curEventParticipants.length < 1 ?
                    <div className="h-[50vh] fullcenter">
                        No Participants

                    </div> : <section className="py-4">
                        {
                            curEventParticipants.map((i: any) => {
                                const isWon = i?.win_place ? true : false
                                return <div className="my-2 flex items-center justify-between px-2 py-3 rounded bg-gray-50 border ">
                                    <section className="flex items-center">
                                    <section className="relative h-10 w-10 bg-primaryDark fullcenter  rounded-xl mr-2 text-white">
                                  {isWon?<LuBadge className="text-3xl" />:<HiChevronRight />
                                  }
                                    
                                    <div className="absolute">
                                    {isWon ? <div className="text-xs">{i?.win_place}</div> : null}
                                    </div>
                                    </section>

                                        <div >
                                            {i?.participant?.name} <span className="mx-1 text-xs">{i?.participant?.place}</span> ({i?.participant?.chest_no})

                                        </div>
                                    </section>
                                    <button
                                        onClick={() => {
                                            setParticipation(i);
                                        }}
                                        className="bg-primaryDark hover:shadow-xl text-white p-2 text-sm rounded-xl disabled:bg-gray-500 ">
                                        <MdOutlinePostAdd className="text-2xl" />
                                    </button>
                                </div>
                            })
                        }
                    </section>
            }
            <section>

            </section>


            <UpdateResult onHide={() => setParticipation(null)}
                onAdd={() => getParticipants(program.id)}
                partic={participation}
            />

        </div>
    );
}

export default ViewResults;