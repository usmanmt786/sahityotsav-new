"use client";

import ZDialog from "@/components/common/ZDialog";
import { ZFormInput, ZFormSelect, ZFormTextArea, ZSubmitButton } from "@/components/widgets/Form";
import { rowUpdateSignal } from "@/controller/row_actions";
import { useSignalEffect } from "@preact/signals-react";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from 'yup';
import {  updateTeam } from "./func";

const EditTeam = () => {
    const [loading, setLoading] = useState(false);


    const [item, setItem] = useState<any>(null);

    useSignalEffect(()=>{
        if(rowUpdateSignal.value && rowUpdateSignal.value.type==="team" && rowUpdateSignal.value.action=="edit"){
            const data = rowUpdateSignal.value.data;            
            setItem(data);
            formik.setValues({
                name:data.name,
                code:data.code
            });
            
        }
    })

    const formik  = useFormik({
        initialValues:{
            name:'',
            code:'',
         

        },
        validationSchema: Yup.object({
            name:Yup.string().required("Name is Required"),
        }),
        onSubmit:async(val)=>{
            setLoading(true);
            
            const resp = await updateTeam(item?.id, val.name, val.code);
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

        header="Edit Team"
        >
            <form onSubmit={formik.handleSubmit}>
                <ZFormInput
                formik={formik}
                formLabel="Team Name"
                name="name"
                />
              <ZFormInput
                formik={formik}
                formLabel="Team Code"
                name="code"
                placeHolder="Eg: KA"
                />
             
                
                <div className="fullcenter">
                    <ZSubmitButton
                    loadText="Adding Team..."
                    loading={loading}
                    text="Add Team"
                    />
                </div>
            </form>
        </ZDialog>
        
    );
}

export default EditTeam;