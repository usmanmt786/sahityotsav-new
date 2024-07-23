"use client";

import ZDialog from "@/components/common/ZDialog";
import { ZFormInput, ZFormSelect, ZFormTextArea, ZSubmitButton } from "@/components/widgets/Form";
import { rowUpdateSignal } from "@/controller/row_actions";
import { useSignalEffect } from "@preact/signals-react";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { addProgram, editProgram } from "./func";
import * as Yup from 'yup';
import { PARTICIPATION_TYPE, STAGE_TYPE } from "./data";

const AddProgram = ({cats}:{cats:any[]}) => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);


    useSignalEffect(()=>{
        if(rowUpdateSignal.value && rowUpdateSignal.value.type==="program" && rowUpdateSignal.value.action=="add"){
            setShow(true)

        }
    })

    const formik  = useFormik({
        initialValues:{
            catId:0,
            name:'',
            type:'',
            stageType:'',
            participants:1,

        },
        validationSchema: Yup.object({
            name:Yup.string().required("Name is Required"),
            catId:Yup.string().required("Category is Required"),
            type:Yup.string().required("Participation Type is Required"),
            stageType:Yup.string().required("Stage Type is Required"),
            participants:Yup.string().required("Participants is Required"),
        }),
        onSubmit:async(values)=>{
            setLoading(true);
            
            const resp = await addProgram(values);
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
        header="Add Program"
        >
            <form onSubmit={formik.handleSubmit}>
                <ZFormInput
                formik={formik}
                formLabel="Program Name"
                name="name"
                />
                <ZFormSelect
                formik={formik}
                formLabel="Category"
                name="catId"
                options={cats.map(cat => ({label:cat.name, value:cat.id}))}
               
                />
                <ZFormSelect
                formik={formik}
                formLabel="Participation Type"
                name="type"
                options={PARTICIPATION_TYPE}
                />
                <ZFormSelect
                formik={formik}
                formLabel="Stage Type"
                name="stageType"
                options={STAGE_TYPE}
                />
                <ZFormInput
                formik={formik}
                formLabel="Participants"
                name="participants"
                type="number"
                />
                
                <div className="fullcenter">
                    <ZSubmitButton
                    loadText="Updating..."
                    loading={loading}
                    text="Update"
                    />
                </div>
            </form>
        </ZDialog>
        
    );
}

export default AddProgram;