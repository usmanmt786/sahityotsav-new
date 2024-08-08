import VideoModel from "@/models/videos/video_model";
import AddVideo from "./AddVideo";
import Title from "./Title";
import EditVideo from "./EditVideo";
import VideoActions from "./Actions";

const VideosIndex = async () => {
    const videos = await VideoModel.getAllVideos();
    return (
        <div className="commonwidth ">
            <Title/>
            {
                videos.length<1 ? <div className="fullcenter h-[30vh] border my-2 bg-gray-50">No Videos Found</div>:
                <section className="grid lg:grid-cols-4 gap-8">
                    {
                        videos.map((vid:any)=>{
                            return <div key={vid.id} className="relative border rounded-xl group">
                                <div className="w-full rounded-t-xl h-40"
                                style={{
                                    backgroundImage:`url(https://img.youtube.com/vi/${vid.yt_id}/hqdefault.jpg)`,
                                    backgroundSize:'cover',
                                    backgroundPosition:'center'
                                }}
                                >

                                </div>
                                <section 
                                className="absolute top-5 right-5 text-white opacity-0 
                                group-hover:opacity-100 flex items-center gap-x-2 text-sm font-bold duration-300 " >
                                    <VideoActions vid={vid}/>
                               


                                </section>
                                
                                <h5 className="p-2 font-bold text-sm">{vid.title}</h5>
                                
                            </div>
                        })
                    }
                </section>
            }
           
            <AddVideo/>
            <EditVideo/>
        </div>
    );
}

export default VideosIndex;