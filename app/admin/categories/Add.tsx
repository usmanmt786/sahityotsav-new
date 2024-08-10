"use client";

import ZDialog from "@/components/common/ZDialog";
import { ZFormInput, ZFormSelect, ZFormTextArea, ZSubmitButton } from "@/components/widgets/Form";
import { rowUpdateSignal } from "@/controller/row_actions";
import { useSignalEffect } from "@preact/signals-react";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from 'yup';
import { addCategory } from "./func";

const AddCategory = () => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);


    useSignalEffect(()=>{
        if(rowUpdateSignal.value && rowUpdateSignal.value.type==="category" && rowUpdateSignal.value.action=="add"){
            setShow(true)

        }
    })

    const formik  = useFormik({
        initialValues:{
            name:'',
           

        },
        validationSchema: Yup.object({
            name:Yup.string().required("Name is Required"),
        }),
        onSubmit:async(val)=>{
            setLoading(true);
            
            const resp = await addCategory(val.name);
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
        header="Add Category"
        >
            <form onSubmit={formik.handleSubmit}>
                <ZFormInput
                formik={formik}
                formLabel="Category Name"
                name="name"
                />
            
                
                <div className="fullcenter">
                    <ZSubmitButton
                    loadText="Adding Category..."
                    loading={loading}
                    text="Add Category"
                    />
                </div>
            </form>
        </ZDialog>
        
    );
}

export default AddCategory;