"use client";

import { ZFormInput, ZFormSelect, ZSubmitButton } from "@/components/widgets/Form";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { getProgramByCat, getWinResult } from "./func";
import { LuBadge } from "react-icons/lu";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaIdCardAlt } from "react-icons/fa";
import Posters from "./Posters";


const ResultsSection = ({cats,posters}:{cats:any[],posters:any[]}) => {

    const [loading, setLoading] = useState(false);
    const [programs, setPrograms] = useState<any[]>([]);

    const [result, setResult] = useState<any>(null);

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
            setLoading(true);
            const resp = await getWinResult(val.program!);
            setResult(resp);
            setLoading(false);
            
        }
    });

    async function getPrograms(catId:number){
        const resp = await getProgramByCat(catId);
        setPrograms(resp);
        
    }
    return (
        <div className="w-full">

            <form onSubmit={formik.handleSubmit} 
            className="bg-primary w-full lg:w-5/12 mx-auto my-10 bg-opacity-10 ring-2 ring-primary p-8 rounded-xl">
                <h1 className="text-2xl font-bold text-primaryDark">Check Results</h1>
                <ZFormSelect formik={formik} formLabel="Category" name="category"
                                options={cats.map(cat => ({label:cat.name, value:cat.id}))} filter
                                onChange={(e:any)=>{
                                    formik.setFieldValue('category',e.value);
                                    formik.setFieldValue('program',null);

                                    getPrograms(e.value);
                                }}
                />
                <ZFormSelect 
                formik={formik} 
                formLabel="Program" 
                name="program" 
                options={programs.map(p => ({label:p.name, value:p.id}))}
                disabled={programs.length===0}
                filter/>
                <div className="fullcenter mt-2">
                <ZSubmitButton loadText="Fetching Results.." loading={loading} text="Get Results"/>
                

{
    result && 
    <section className="mt-3">
        {
            result.length<1 ? 
            <div className="bg-red-50 px-4 py-3 rounded-md text-red-600 select-none fullcenter">
                <MdOutlinePendingActions className="text-3xl mb-1" />

                Results Not Declared</div>:
            <div>
                <h1 className="text-xl mb-2">Results</h1>
    {
   result.map((res:any)=>

           {

          return  <div key={res.id} className="relative flex items-center gap-x-2 mb-3 bg-white px-5 py-2 border border-primary rounded-lg">
              
               <section className="relative h-10 w-10 bg-primaryDark fullcenter  rounded-xl mr-1 text-white">
               <LuBadge className="text-3xl" />
                    
                    <div className="absolute">
                    <div className="text-xs">{res?.win_place}</div>
                    </div>
                    </section>
                    <div >
                            <h6>{res?.participant?.name}
                            <span className=" ml-1 bg-primaryDark text-xs text-white px-2  rounded-md  inline-flex items-center">
              <FaIdCardAlt className="mr-1"/>
{res?.participant?.chest_no}
              </span>
                                 </h6>
                            <h6 className="text-xs text-gray-400">{res?.participant?.place}</h6>
                             

                        </div>
            </div>
           }
        )
    }
            </div>
        }
        
</section>
}
               


                </div>

            </form>

           {
            result && result.length>0 &&  <section>
                <Posters posters={posters} results={result}/>
                </section>
           }
        </div>
    );
}

export default ResultsSection;