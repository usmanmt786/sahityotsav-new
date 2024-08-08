"use client";

import { ZFormInput, ZSubmitButton } from "@/components/widgets/Form";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { updateLiveConfigs } from "./func";

const EditLiveConfigs = ({ confs }: { confs: any }) => {

    const [loading, setLoading] = useState(false);


 useEffect(()=>{
    if(confs){
        formik.setValues({
            live1:confs.live1??'',
            live2:confs.live2??'',
            live3:confs.live3??''
        });
    }
 },[confs]);

    const formik = useFormik({
        initialValues: {
            live1:'',
            live2:'',
            live3:''
        },
        onSubmit: async (values) => {
            setLoading(true);
            const resp = await updateLiveConfigs(values.live1, values.live2, values.live3);
            if (resp.code === 0) {
                toast.success(resp.message);
            } else {
                toast.error(resp.message);
            }
            setLoading(false);
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}
            className="mx-auto  bg-primary bg-opacity-15 p-8 
        ring-primaryDark ring-2 rounded-lg">

                    <h1 className="text-2xl font-bold  text-primaryDark">Youtube Live</h1>
                    <ZFormInput formik={formik}
                        formLabel="Live 1 ID"
                        name="live1"
                        placeHolder="Eg: YDfiTGGPYCk"
                    />
                    <ZFormInput formik={formik}
                        formLabel="Live 2 ID"
                        name="live2"
                        placeHolder="Eg: YDfiTGGPYCk"
                    />

<ZFormInput formik={formik}
                        formLabel="Live 3 ID"
                        name="live3"
                        placeHolder="Eg: YDfiTGGPYCk"
                    />
<div className="fullcenter py-6">
                <ZSubmitButton
                    loading={loading}
                    loadText="Updating..."
                    text="Update Live Links"

                />
            </div>

           
        </form>
    );
}

export default EditLiveConfigs;