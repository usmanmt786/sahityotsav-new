"use client";

import { useFormik } from "formik";
import ImageUpload from "./Image";
import { useState } from "react";
import { isFile } from "@/functions/utils/file";
import { uploadFile } from "@/drive/upload";
import { uploadImage } from "../posters/func";
import { uploadCustomizeImage } from "./func";
import { ZSubmitButton } from "@/components/widgets/Form";
import { updateConfigs } from "../configs/func";
import toast from "react-hot-toast";

const CustomizeForm = ({configs}:{configs:any}) => {
    const [bgImage, setBgImage] = useState<any>(configs?.heroBg);
    const [aboutImg, setAboutImg] = useState<any>(configs?.aboutImage);
    const [resultImg, setResultImg] = useState<any>(configs?.resultImage);


    const [loading, setLoading]  = useState(false);

    const formik = useFormik({
        initialValues:{

        },
        onSubmit:async(val)=>{
            setLoading(true);
           
            const values:any = {
               
            };
            
            if(bgImage!=null && isFile(bgImage)){
                const formData = new FormData();
                formData.append('files', bgImage);
                const img = await uploadCustomizeImage(formData);
                setBgImage(img);
                values['heroBg'] = img;

            }

            if(aboutImg!=null && isFile(aboutImg)){
                const formData = new FormData();
                formData.append('files', aboutImg);
                const img = await uploadCustomizeImage(formData);
                setAboutImg(img);
                values['aboutImage'] = img;

            }

            if(resultImg!=null && isFile(resultImg)){
                const formData = new FormData();
                formData.append('files', resultImg);
                const img = await uploadCustomizeImage(formData);
                setResultImg(img);
                values['resultImage'] = img;

            }
           

            const resp = await updateConfigs(values);
            if(resp.code===0){
                toast.success("Site Customized Successfully");
            }else{
                toast.error(resp.message);
            }
            
            setLoading(false);

        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <ImageUpload id="bg"
            width={1920} height={1080}
            labelText="Hero Background" 
            cur={bgImage} 
            onChange={(e:any)=>{
                setBgImage(e);
            }}/>

<ImageUpload id="about"
            width={1000} height={1000}
            labelText="About Section Image" 
            cur={aboutImg} 
            onChange={(e:any)=>{
                setAboutImg(e);
            }}/>

<ImageUpload id="result"
            width={1000} height={1000}
            labelText="Result Section Image" 
            cur={resultImg} 
            onChange={(e:any)=>{
                setResultImg(e);
            }}/>

            <ZSubmitButton loading={loading} loadText="Saving Changes..." text="Update Site"/>

        </form>
    );
}

export default CustomizeForm;