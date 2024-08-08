import GuestLayout from "@/components/layout/GuestLayout";
import VideoModel from "@/models/videos/video_model";
import Link from "next/link";

const YoutubeVideos = async() => {
    const videos = await VideoModel.getAllVideos();

    return (
        <GuestLayout>
            <main className="commonwidth min-h-[80vh] py-10">
            {videos.length<1 ? <div className="fullcenter h-[40vh] border bg-gray-50">
                
                Videos are coming soon</div>:
               <section className="grid lg:grid-cols-4 gap-8">
               {
                   videos.map((vid)=>{
                       return <Link key={vid.id}
                       href={`https://www.youtube.com/watch?v=${vid.yt_id}`}
                       className=" border rounded-xl group ring-primaryDark hover:ring-2 duration-300">
                           <div className="w-full rounded-t-xl h-40"
                           style={{
                               backgroundImage:`url(https://img.youtube.com/vi/${vid.yt_id}/hqdefault.jpg)`,
                               backgroundSize:'cover',
                               backgroundPosition:'center'
                           }}
                           >
                           </div>
                           <h5 className="p-2 font-bold text-sm">{vid.title}</h5>
                           
                           
                       </Link>
                   })
               }
           </section>
                }
            </main>
        </GuestLayout>
    );
}

export default YoutubeVideos;