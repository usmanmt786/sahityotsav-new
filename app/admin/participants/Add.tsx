"use client";

import ZDialog from "@/components/common/ZDialog";
import { ZFormInput, ZSubmitButton } from "@/components/widgets/Form";
import { useSignalEffect } from "@preact/signals-react";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { rowUpdateSignal } from "@/controller/row_actions";
import { addParticipant } from "./func";
import * as Yup from "yup";

const AddParicipant = () => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);


    useSignalEffect(() => {
        if (rowUpdateSignal.value && rowUpdateSignal.value.type === "participant" && rowUpdateSignal.value.action == "add") {
            setShow(true)
        }
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            place: '',
            chestNo: '',
          
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is Required"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            const resp = await addParticipant(values.name, values.place, values.chestNo);
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