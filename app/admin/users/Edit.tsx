"use client";

import ZDialog from "@/components/common/ZDialog";
import { ZFormInput, ZFormSelect, ZFormTextArea, ZSubmitButton } from "@/components/widgets/Form";
import { useSignalEffect } from "@preact/signals-react";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { rowUpdateSignal } from "@/controller/row_actions";
import * as Yup from "yup";
import { updateUser } from "./func";
import { ROLES } from "./data";


const EditUser = () => {
    const [item, setItem] = useState<any>(null);
    const [loading, setLoading] = useState(false);


    useSignalEffect(()=>{
        if(rowUpdateSignal.value && 
            rowUpdateSignal.value.type==="user" && 
            rowUpdateSignal.value.action=="edit"){
            const data = rowUpdateSignal.value.data;
            
            setItem(data);
            formik.setValues({
                id: data.id,
                role: data.role,
                status: data.status
            });
        }
    })

    const formik  = useFormik({
        initialValues:{
            id: item?.id,
            role: item?.role,
            status: item?.status
            
        },validationSchema:  Yup.object({
            role:Yup.string().required("Role is Required"),
        }),
        onSubmit:async(values)=>{
            setLoading(true);
            const resp = await updateUser(values.id,values.status==="Invited", values.role);
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
            <h2 className="text-2xl font-bold">Edit User</h2>
            <form onSubmit={formik.handleSubmit}>
            <ZFormSelect
                formik={formik}
                    formLabel="Role"
                    name="role"
                    options={ROLES}
               />
                <div className="fullcenter">
                    <ZSubmitButton
                    loadText="Updating..."
                    loading={loading}
                    text="Update User"
                    />
                </div>
            </form>
        </ZDialog>
        
    );
}

export default EditUser;