"use client";

import { ZFormInput, ZSubmitButton } from "@/components/widgets/Form";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { updateTeamPoint } from "./func";
import toast from "react-hot-toast";

const PointForm = ({curPoints}:{curPoints:any[]}) => {

    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        if(curPoints){
            let newMap:any = {};
            for (const item of curPoints){
                newMap[item.id] = item.point
            }
            formik.setValues(newMap);
        }
    }, [curPoints])
    const formik = useFormik({
        initialValues:{

        },
        onSubmit:async(val)=>{
            setLoading(true);
            const res = await updateTeamPoint(val);
            if(res){
                toast.success("Points Updated");
            }else{
                toast.error("Something went wrong");
            }

            setLoading(false);

        }
    })
    return (
        <form className="" onSubmit={formik.handleSubmit}>
            <section className="grid lg:grid-cols-4 gap-10">
            {
                curPoints.map((item)=>{
                    return <div key={item.id} className="bg-primary bg-opacity-15 p-5 border rounded-xl">
                        <ZFormInput
                    
                    formLabel={item?.name}
                    formik={formik}
                    name={item.id}
                    
                    />
                    </div>
                })
            }
            </section>
           
            <div className="py-4">
                <ZSubmitButton
                loadText="Updating Points"
                loading={loading}
                text="Update Points"

                />
            </div>
        </form>
    );
}

export default PointForm;