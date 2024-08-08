"use client";

import ZDialog from "@/components/common/ZDialog";
import { useEffect, useState } from "react";
import PosterEditor from "./PosterEditor";
import {  deleteTemplate, updatePosterTemplate } from "./func";
import toast from "react-hot-toast";
import Constants from "@/data/constants";
import Swal from "sweetalert2";

const EditResultPoster = ({ poster, onHide }: { poster: any, onHide: any }) => {
    const [loading, setLoading] = useState(false);
    const [posterConfigs, setPosterConfigs] = useState({
        theme: "light",
        x:  100,
        y:  100
    });

    useEffect(() => {
        console.log(poster);
        
        setPosterConfigs({
            theme: poster?.theme ?? "light",
            x: poster?.body_locx ?? 100,
            y: poster?.body_locy ?? 100
        });
    }, [poster]);


    async function handleSubmit() {
        const addResp = await updatePosterTemplate(poster?.id, posterConfigs);
        if (!addResp) {
            toast.error("Failed to update template");
            setLoading(false);
            return;
        }
        toast.success("Template updated successfully");
        onHide();
        setLoading(false);
    }


    function deleteItem(){
        Swal.fire({
            
            title: "Delete Template",
            text:"Do you want to delete this template?",
            showCancelButton: true,
            confirmButtonText: "Delete",
            
          }).then(async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
            const resp =   await deleteTemplate(poster?.id);
              if(resp){
                toast.success("Template deleted successfully");
                
              }else{
                toast.error("Failed to delete template");
              }
              onHide();
            } 
          });
    }
    return (
        <div>
            <ZDialog
                visible={poster !== null}
                onHide={() => {
                    onHide();
                }}
                header="Update Template"
            >


                <PosterEditor
                    curTheme={posterConfigs.theme}
                    x={posterConfigs.x}
                    y={posterConfigs.y}
                    imageUrl={`${Constants.DRIVE_URL}uploads/posters/${poster?.file_name}`}
                    onChange={(theme: string, x: number, y: number) => {
                        setPosterConfigs({
                            theme, x, y
                        });

                    }}
                />

                <div className="mt-5 flex justify-center gap-x-5">
                    <button className="outline-btn"
                    onClick={deleteItem}
                    >
                        Delete
                    </button>
                    <button className=" bg-gbg btn text-white"
                        onClick={handleSubmit}
                    >{loading ? "Updating Template..." : "Update Template"}</button>



                </div>


            </ZDialog>
        </div>
    );
}

export default EditResultPoster;