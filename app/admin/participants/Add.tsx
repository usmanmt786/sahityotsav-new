"use client";

import ZDialog from "@/components/common/ZDialog";
import { ZFormInput, ZFormSelect, ZSubmitButton } from "@/components/widgets/Form";
import { useSignalEffect } from "@preact/signals-react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { rowUpdateSignal } from "@/controller/row_actions";
import { addParticipant } from "./func";
import * as Yup from "yup";

const AddParicipant = ({teams}:{teams:any[]}) => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const [teamsList, setTeams] = useState<any[]>([]);

    useEffect(()=>{
        if(teams){
            setTeams(teams)
        }
    },[teams])



    useSignalEffect(() => {
        if (rowUpdateSignal.value && rowUpdateSignal.value.type === "participant" && rowUpdateSignal.value.action == "add") {
            setShow(true)
        }
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            team: 0,
            chestNo: '',
          
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is Required"),
            team: Yup.number().min(1,"Team is Required"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            const resp = await addParticipant(values.name, values.team, values.chestNo);
            if (resp.code === 0) {
                toast.success(resp.message);
                formik.resetForm();
                setShow(false);
            } else {
                toast.error(resp.message);
            }
            setLoading(false);
        }
    });

    return (
        <ZDialog
            visible={show}
            onHide={() => setShow(false)}
            header=""
        >
            <h2 className="text-2xl font-bold">Add Participant</h2>
            <form onSubmit={formik.handleSubmit}>
                <ZFormInput
                    formik={formik}
                    formLabel="Participant Name"
                    name="name"
                />

               <ZFormSelect
                    formik={formik}
                    formLabel="Team"
                    name="team"
                    options={teamsList.map((team:any)=>({label:team.name, value:team.id}))}
                    />

               

                <ZFormInput
                    formik={formik}
                    formLabel="Chest Number"
                    name="chestNo"
                />
                <div className="fullcenter">
                    <ZSubmitButton
                        loadText="Adding Participant..."
                        loading={loading}
                        text="Add Paticipant"
                    />
                </div>
            </form>
        </ZDialog>

    );
}

export default AddParicipant;