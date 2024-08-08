const LiveScreen = ({ytId}:{ytId:string}) => {
    return (
        <div>
            <iframe width="100%" 
            className="h-80 rounded-xl" 
            src={`https://www.youtube.com/embed/${ytId}`} title="YouTube video player" 
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
    );
}

export default LiveScreen;