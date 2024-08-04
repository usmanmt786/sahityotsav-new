"use client";

import { ZFormInput, ZSubmitButton } from "@/components/widgets/Form";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { updateConfigs } from "./func";
import toast from "react-hot-toast";

const EditConfigs = ({ confs }: { confs: any }) => {

    const [loading, setLoading] = useState(false);


 useEffect(()=>{
    if(confs){
        formik.setValues(confs);
    }
 },[confs]);

    const formik = useFormik({
        initialValues: confs,
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
            className="mx-auto  bg-primary bg-opacity-15 p-8 
        ring-primaryDark ring-2 rounded-lg">

            <div className="grid lg:grid-cols-2 gap-10">
                <section>
                    <h1 className="text-2xl font-bold  text-primaryDark">Configurations</h1>
                    <ZFormInput formik={formik}
                        formLabel="Type Name"
                        name="typeName"
                        placeHolder="Eg: Kannur"
                    />
                    <ZFormInput formik={formik}
                        formLabel="Venue"
                        name="venue"
                        placeHolder="Eg: Thalassery"
                    />
                    <ZFormInput formik={formik}
                        formLabel="Venue Dates"
                        name="venueDates"
                        placeHolder="Eg: August 10, 11, 12"
                    />

<h1 className="text-2xl font-bold  text-primaryDark mt-4">Contact</h1>
                    <ZFormInput formik={formik}
                        formLabel="Contact 1"
                        name="contact1"
                        placeHolder="Eg: 9876543210"
                    />
                    <ZFormInput formik={formik}
                        formLabel="Contact 2"
                        name="contact2"
                        placeHolder="Eg: 9876543210"
                    />
                    <ZFormInput formik={formik}
                        formLabel="Venue Location"
                        name="venueLocation"
                        placeHolder="Eg: https://maps.google.com/..."
                    />


                </section>

                <section>
                    <h2
                        className="text-2xl font-bold  text-primaryDark">
                        Social Media</h2>
                    <ZFormInput formik={formik}
                        formLabel="Youtube Channel"
                        name="youtube"
                    />

                    <ZFormInput formik={formik}
                        formLabel="Facebook Page"
                        name="facebook" />

                    <ZFormInput formik={formik}
                        formLabel="Instagram Page"
                        name="instagram" />

                    <ZFormInput formik={formik}
                        formLabel="Twitter Page"
                        name="twitter" />
                </section>

            </div>

            <div className="fullcenter py-6">
                <ZSubmitButton
                    loading={loading}
                    loadText="Updating..."
                    text="Update Configs"

                />
            </div>
        </form>
    );
}

export default EditConfigs;