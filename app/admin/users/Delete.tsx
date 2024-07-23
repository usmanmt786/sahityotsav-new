"use client";

import ZDialog from "@/components/common/ZDialog";
import { ZSubmitButton } from "@/components/widgets/Form";
import { useSignalEffect } from "@preact/signals-react";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { rowUpdateSignal } from "@/controller/row_actions";
import { deleteUser } from "./func";


const DeleteUser = () => {

    const [item, setItem] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useSignalEffect(()=>{
        if(rowUpdateSignal.value && 
            rowUpdateSignal.value.type==="user" && 
            rowUpdateSignal.value.action=="delete"){
            const data = rowUpdateSignal.value.data;
            setItem(data);
            formik.setValues({
                id: data.id,
                status: data.status
            });
        }
    })

    const formik  = useFormik({
        initialValues:{
            id: item?.id,
            status: ""
        },
        onSubmit:async(values)=>{
            setLoading(true);
            const resp = await deleteUser(values.id, values.status==="Invited");
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
            <form onSubmit={formik.handleSubmit}>
                <div className="text-center">
                    <h1 className="text-2xl my-2">Delete User</h1>
                    <p>Are you sure you want to delete this user?<br />Once deleted he will loose access to the platform </p>
                </div>
                <div className="flex justify-center items-center gap-x-6 my-2">
                    <button className="outline-btn"
                    type="button"
                    onClick={()=>setItem(null)}
                    >Cancel</button>
                    <ZSubmitButton
                    loadText="Deleting..."
                    loading={loading}
                    text="Delete"
                    />
                </div>
            </form>
        </ZDialog>
        
    );
}

export default DeleteUser;