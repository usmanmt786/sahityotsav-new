"use client";

import ZDialog from "@/components/common/ZDialog";
import { useState } from "react";
import { AiOutlineCloudUpload, AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdError } from "react-icons/md";
import PosterEditor from "./PosterEditor";
import { addPoster, uploadImage } from "./func";
import toast from "react-hot-toast";

const UploadResultPoster = () => {
    const [show, setShow] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [posterConfigs, setPosterConfigs] = useState({
        theme:"light",
        x:100,
        y:100
    });

function handleFile(e:any){
    const ev = e.currentTarget.files;
    if (ev) {
      if (ev.length === 0) {
        return;
      }
      var img: HTMLImageElement;
      img = document.createElement("img");

      img.onload = function () {
        if(img.width!==1500 && img.height!==1500){
            setError('Image must be 1500x1500 px');
        }else{
            setError('');
            setImage(ev[0]);
        }
      };

      img.src = URL.createObjectURL(ev[0]);
      
    }
}

async function handleSubmit(){
    if(!image){
        toast.error('Please select an image');
        return;
    }

    setLoading(true);

    const data = new FormData()
      data.set('files', image!)

    const resp = await uploadImage(data);
    if(!resp.success){
        toast.error("Failed to Upload");
        setLoading(false);

        return ;
    }
    if(resp?.files?.length===0){
        toast.error("Failed to Upload");
        setLoading(false);
        return ;
    }
    const filename = resp?.files[0]?.name;
    const addResp = await addPoster(filename,posterConfigs);
    if(!addResp){
        toast.error("Failed to add template");
        setLoading(false);
        return ;
    }
    toast.success("Template added successfully");
    setShow(false);
    setLoading(false);


    
}


    return (
        <div>
            <button className="submit-btn gbg"
            onClick={() => setShow(true)}
            >Add Template</button>

            <ZDialog
            visible={show}
            onHide={() => {
                setShow(false);
                setError(null);
                setImage(null);
            }}
            header="Add Poster Template"
            >
                {error && <div className="text-sm py-2 px-3 bg-red-200 text-red-600 rounded-md my-2 flex items-center ">
                    <MdError className="mr-1"/>{error}</div>}
                <input 
                type="file"
                 id="image"
                 accept="image/png, image/jpeg"
                 className="hidden" onChange={handleFile} />

                {
                    image ? <div>
                        <PosterEditor
                        curTheme={posterConfigs.theme}
                        x={posterConfigs.x}
                        y={posterConfigs.y}
                        imageUrl={URL.createObjectURL(image)} 
                        onChange={(theme:string,x:number,y:number)=>{
                            setPosterConfigs({
                                theme,x,y
                            });
                            
                        }}
                        />
                       
                        {
                            loading ? <div className="flex justify-center items-center text-primaryDark my-3">
                                <AiOutlineLoading3Quarters className="text-xl mr-2 animate-spin"/>
                                Adding Template...</div>:
                                <div className="mt-5 flex justify-center gap-x-5">
                            <label htmlFor="image" className="outline-btn">Change Image</label>
                                <button className=" gbg btn text-white"
                                onClick={handleSubmit}
                                >Add Template</button>
                            </div>
                        }

                    </div>: <label 
                    htmlFor="image"
                    className="border rounded-lg w-full p-5 fullcenter text-gray-400 text-sm mt-5">
                    <AiOutlineCloudUpload className="text-5xl " />
                    <h6>Pick Image</h6>
    
                    </label>
                }
                
            </ZDialog>
        </div>
    );
}

export default UploadResultPoster;