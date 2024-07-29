import PosterModel from "@/models/posters/poster_model";
import UploadResultPoster from "./UploadResultPoster";
import PostersGrid from "./PostersGrid";

const PostersIndex = async () => {

    const posters = await PosterModel.getResultPosters();

    return (
        <div className="commonwidth">
            <section className="flex justify-between items-center">
            <h1 className="text-2xl mb-4">Result Posters</h1>
            {posters.length<3 && <UploadResultPoster/> }
            </section>
            <PostersGrid posters={posters}/>

        </div>
    );
}

export default PostersIndex;