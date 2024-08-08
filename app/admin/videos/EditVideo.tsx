"use client";

import ZDialog from "@/components/common/ZDialog";
import { ZFormInput,ZSubmitButton } from "@/components/widgets/Form";
import { rowUpdateSignal } from "@/controller/row_actions";
import { useSignalEffect } from "@preact/signals-react";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from 'yup';
import {   updateVideo } from "./func";

const EditVideo = () => {
    const [loading, setLoading] = useState(false);

    const [item, setItem] = useState<any>(null);

    useSignalEffect(()=>{
        if(rowUpdateSignal.value && rowUpdateSignal.value.type==="video" && rowUpdateSignal.value.action=="edit"){
            const data = rowUpdateSignal.value.data;            
            setItem(data);
            formik.setValues({
                title:data.title,
                ytId:data.yt_id,
            });
            
        }
    })

    const formik  = useFormik({
        initialValues:{
            title:'',
            ytId:'',
         

        },
        validationSchema: Yup.object({
            title:Yup.string().required("Name is Required"),
            ytId:Yup.string().required("Youtube ID is Required")
            .min(11,"Youtube ID is Invalid").max(11,"Youtube ID is Invalid"),
        }),
        onSubmit:async(val)=>{
            setLoading(true);
            
            const resp = await updateVideo(item?.id, val.title, val.ytId);
            if(resp.code===0){
                toast.success(resp.message);
                formik.resetForm();
                setItem(null);
            }else{
                toast.error(resp.message);
            }
            setLoading(false);
        }
    });

    return (
            <ZDialog
            visible={item!==null}
            onHide={() => setItem(null)}

        header="Edit Video"
        >
             <form onSubmit={formik.handleSubmit}>
                <ZFormInput
                formik={formik}
                formLabel="Video Title"
                name="title"
                />
              <ZFormInput
                formik={formik}
                formLabel="Youtube Video ID"
                name="ytId"
                placeHolder="Eg: nvQf_v07hMA"
                />
                
                <div className="fullcenter">
                    <ZSubmitButton
                    loadText="Adding Video..."
                    loading={loading}
                    text="Add Video"
                    />
                </div>
            </form>
        </ZDialog>
        
    );
}

export default EditVideo;