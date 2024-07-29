
const PostersGrid = ({posters}:{posters: any}) => {
    return (
        <div className="grid lg:grid-cols-4 gap-8">
            {
posters.map((ps:any)=>{
    return <div key={ps.id}>
        <img src={`/assets/posters/${ps.file_name}`} className="rounded-lg border" alt="" />
    </div>
})
            }
        </div>
    );
}

export default PostersGrid;