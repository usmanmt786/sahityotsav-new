"use client";

import ZDialog from "@/components/common/ZDialog";
import { ZFormInput, ZFormSelect, ZFormTextArea, ZSubmitButton } from "@/components/widgets/Form";
import { rowUpdateSignal } from "@/controller/row_actions";
import { useSignalEffect } from "@preact/signals-react";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from 'yup';
import { addVideo } from "./func";

const AddVideo = () => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);


    useSignalEffect(()=>{
        if(rowUpdateSignal.value && rowUpdateSignal.value.type==="video" && rowUpdateSignal.value.action=="add"){
            setShow(true)

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
            
            const resp = await addVideo(val.title, val.ytId);
            if(resp.code===0){
                toast.success(resp.message);
                formik.resetForm();
                setShow(false);
            }else{
                toast.error(resp.message);
            }
            setLoading(false);
        }
    });

    return (
            <ZDialog
            visible={show}
            onHide={() => setShow(false)}
        header="Add Team"
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

export default AddVideo;