import Constants from "@/data/constants";
import SinglePoster from "./SinglePoster";

const Posters = ({results,posters, }:{results:any, posters:any[], }) => {
    return (
        <div className="mb-8">
            <h1 className="text-xl">Posters</h1>
            <section className="grid lg:grid-cols-3">
                {
                    posters.map((ps: any) => {
                        
                        return (
                            <div key={ps.id}>
                                <SinglePoster 
                                result={results}
                                imageUrl={`${Constants.DRIVE_URL}uploads/${ps.file_name}`}
                                x={ps.body_locx} y={ps.body_locy}
                                />

                            </div>
                        )
                    })
                }
            </section>
        </div>
    );
}

export default Posters;