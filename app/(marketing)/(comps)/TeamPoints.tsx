"use client";


const TeamPoints = ({points}:{points:any[]}) => {
    const firstThree = points.slice(0,3);
    const remaining  = points.slice(3);
    return (
        <div className="commonwidth py-14">
            <h1 className="text-3xl font-bold mb-4 border-b pb-2">Team Score</h1>
            <section className="grid lg:grid-cols-2 gap-8 lg:gap-24">
                <div>
                {
                firstThree.map((item, index)=>{
                    return <div key={item.id} className="flex justify-between items-center text-xl">
                        <section className="flex items-center">
                        <div className="bg-primaryDark fullcenter rounded-lg my-2 h-10 w-10 font-bold mr-2 text-white">{index+1}</div>
                        <div className="mr-5">{item.name}</div>

                        </section>                 
                        <div className="font-bold">{item.point}</div>
                    </div>
                })
            }
                </div>
                <div className="bg-primary bg-opacity-30 p-5 rounded-xl">
                {
                remaining.map((item)=>{
                    return <div key={item.id} className="flex items-center justify-between">
                        <p className="text-xl">{item.name}</p>
                        <p className="font-bold">{item.point}</p>
                    </div>
                })
            }
                </div>
            </section>

            
        </div>
    );
}

export default TeamPoints;