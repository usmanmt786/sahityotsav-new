"use client";

import { ZFormInput, ZFormSelect, ZSubmitButton } from "@/components/widgets/Form";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";


const ResultsSection = ({cats}:{cats:any[]}) => {

    const [loading, setLoading] = useState(false);
    const [programs, setPrograms] = useState([]);

    const formik = useFormik({
        initialValues:{
            category:null,
            program:null
        },
        validationSchema: Yup.object({
            category: Yup.number().required("Category is Required"),
            program: Yup.number().required("Program is required")
        }),
        onSubmit:async(val)=>{
            
        }
    });
    return (
        <div className="w-full">
            <form onSubmit={formik.handleSubmit} className="w-full flex items-center   flex-col lg:flex-row gap-x-2">
                <ZFormSelect formik={formik} formLabel="Category" name="category"
                                options={cats.map(cat => ({label:cat.name, value:cat.id}))} filter

                />
                <ZFormSelect formik={formik} formLabel="Program" name="program" options={programs} filter/>
                <div className="flex items-end">
                <ZSubmitButton loadText="Fetching Results.." loading={loading} text="Get Results"/>

                </div>

            </form>
        </div>
    );
}

export default ResultsSection;