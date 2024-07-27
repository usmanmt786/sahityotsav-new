
import { useState } from "react";
import AddParticpationForm from "./AddParticpation";
import { Dropdown } from "primereact/dropdown";
import { getCurProgramParicipants } from "./func";
import { MdPerson } from "react-icons/md";

const ViewProgramlist = ({ item,  }: { item: any, }) => {
    const [showAdd, setShowAdd] = useState(false);

    const [program, setProgram] = useState<any>(null);
    const [curEventParticipants, setCurEventParticipants] = useState<any[]>([]);

    async function getParticipants(prId: number) {
        if (prId) {
            const resp = await getCurProgramParicipants(prId);
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
                <button className="bg-primaryDark text-white px-4 text-sm rounded-xl disabled:bg-gray-500"
                    onClick={() => setShowAdd(true)}
                    disabled={!program}
                >Add Participation</button>
            </section>

            {
                !program ? <div className="h-[50vh] fullcenter">Please select a program</div> : curEventParticipants.length < 1 ?
                    <div className="h-[50vh] fullcenter">
                        No Participants
                        <button className="bg-primaryDark text-white px-4 text-sm rounded-xl disabled:bg-gray-500 py-2 my-2"
                            onClick={() => setShowAdd(true)}
                        >Add Participation</button>
                    </div> : <section className="py-4">
                        {
                            curEventParticipants.map((i: any) => {
                                return <div className="my-2 flex items-center px-2 py-3 rounded bg-gray-50 border ">
                                    <MdPerson className="text-primaryDark text-lg mr-2" />
                                    <div>
                                        {i?.participant?.name} <span className="mx-1 text-xs">{i?.participant?.place}</span> ({i?.participant?.chest_no})

                                    </div>
                                </div>
                            })
                        }
                    </section>
            }
            <section>

            </section>


            <AddParticpationForm show={showAdd} onHide={() => setShowAdd(false)}
                onAdd={() => getParticipants(program.id)}
                program={program}  />

        </div>
    );
}

export default ViewProgramlist;