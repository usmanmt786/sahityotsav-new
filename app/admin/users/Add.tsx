"use client";

import ZDialog from "@/components/common/ZDialog";
import { ZFormInput, ZFormSelect, ZSubmitButton } from "@/components/widgets/Form";
import { useSignalEffect } from "@preact/signals-react";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { disposeRowUpdate, rowUpdateSignal } from "@/controller/row_actions";
import * as Yup from "yup";
import { addUser } from "./func";
import { ROLES } from "./data";

const AddUser = () => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);


    useSignalEffect(() => {
        if (rowUpdateSignal.value && 
            rowUpdateSignal.value.type === "user" && 
            rowUpdateSignal.value.action == "add") {
            setShow(true)
        }
    })

    const formik = useFormik({
        initialValues: {
            email:"",
            role:"admin",
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Name is Required"),
            role: Yup.string().required("Role is Required"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            const resp = await addUser(values.email, values.role);
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
            onHide={() => {setShow(false);
                disposeRowUpdate()
            }}
            header=""
        >
            <h2 className="text-2xl font-bold">Add User Access</h2>
            <form onSubmit={formik.handleSubmit}>
                <ZFormInput
                    formik={formik}
                    formLabel="Email"
                    name="email"
                />

               <ZFormSelect
                formik={formik}
                    formLabel="Role"
                    name="role"
                    options={ROLES}
               />
                <div className="fullcenter">
                    <ZSubmitButton
                        loadText="Adding User..."
                        loading={loading}
                        text="Add User"
                    />
                </div>
            </form>
        </ZDialog>

    );
}

export default AddUser;