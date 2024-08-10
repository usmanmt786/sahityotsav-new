"use client";

import { ZFormInput, ZFormTextArea, ZSubmitButton } from "@/components/widgets/Form";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { updateConfigs } from "../configs/func";

const ContentChange = ({ confs }: { confs: any }) => {

    const [loading, setLoading] = useState(false);


 useEffect(()=>{
    if(confs){
        formik.setValues({
            homeAbout: confs?.homeAbout,
        });
    }
 },[confs]);

    const formik = useFormik<any>({
        initialValues: {
            homeAbout: "",
        },
        onSubmit: async (values) => {
            setLoading(true);
            const resp = await updateConfigs(values);
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
            className="mx-auto  bg-primary bg-opacity-5 p-8 
        ring-primaryDark ring-1 rounded-lg mb-4">

        
            <h2
                        className="text-2xl font-bold  text-primaryDark">
                       Site Content</h2>
                    <ZFormTextArea formik={formik}
                        formLabel="About"
                        name="homeAbout"
                    />
                <ZSubmitButton
                    loading={loading}
                    loadText="Updating..."
                    text="Update Content"

                />
          
        </form>
    );
}

export default ContentChange;