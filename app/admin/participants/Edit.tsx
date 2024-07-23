"use client";

import ZDialog from "@/components/common/ZDialog";
import { ZFormInput, ZFormTextArea, ZSubmitButton } from "@/components/widgets/Form";
import { useSignalEffect } from "@preact/signals-react";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { rowUpdateSignal } from "@/controller/row_actions";
import { editParticipant } from "./func";
import * as Yup from "yup";


const EditParticipant = () => {
    const [item, setItem] = useState<any>(null);
    const [loading, setLoading] = useState(false);


    useSignalEffect(()=>{
        if(rowUpdateSignal.value && 
            rowUpdateSignal.value.type==="participant" && 
            rowUpdateSignal.value.action=="edit"){
            const data = rowUpdateSignal.value.data;
            
            setItem(data);
            formik.setValues({
                id: data.id,
                name:data.name,
                place:data.place,
                chestNo:data.chest_no,
                fatherName:data.father_name
            });
        }
    })

    const formik  = useFormik({
        initialValues:{
            id: item?.id,
            name:'',
            place:'',
            chestNo:'',
            fatherName:''
            
        },validationSchema:  Yup.object({
            name:Yup.string().required("Name is Required"),
        }),
        onSubmit:async(values)=>{
            setLoading(true);
            const resp = await editParticipant(values);
            if(resp.code===0){
                toast.success(resp.message);
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
        header=""
        >
            <h2 className="text-2xl font-bold">Edit Participant</h2>
            <form onSubmit={formik.handleSubmit}>
            <ZFormInput
                formik={formik}
                formLabel="Participant Name"
                name="name"
                />
                
                <ZFormInput
                formik={formik}
                formLabel="Place"
                name="place"
                />

<ZFormInput
                formik={formik}
                formLabel="Father Name"
                name="fatherName"
                />

<ZFormInput
                formik={formik}
                formLabel="Chest Number"
                name="chestNo"
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

export default EditParticipant;