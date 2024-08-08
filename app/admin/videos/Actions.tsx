"use client";

import { rowUpdateSignal } from "@/controller/row_actions";
import Swal from "sweetalert2";
import { deleteVideo } from "./func";
import toast from "react-hot-toast";

const VideoActions = ({ vid }: { vid: any }) => {
    return (
        <>
            <button className=" bg-green-600 px-3 py-1 rounded-lg shadow-2xl"
                onClick={() => {
                    rowUpdateSignal.value = {
                        type: 'video',
                        action: "edit",
                        data: vid,

                    };
                }}
            >Edit</button>


            <button className=" bg-red-600 px-3 py-1 rounded-lg shadow-2xl"
                onClick={() => {
                    Swal.fire({
                        title: 'Delete Video',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'

                    }).then(async(result) => {
                        if(result.isConfirmed){
                            const resp = await deleteVideo(vid.id);
                            if(resp.code===0){
                                toast.success("Video Deleted");
                            }else{
                                toast.error(resp.message);
                            }
                        }
                    });
                }}
            >Delete</button>
        </>
    );
}

export default VideoActions;