import ZDialog from "@/components/common/ZDialog";
import { ZFormSelect, ZSubmitButton } from "@/components/widgets/Form";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addParticipation, getNonSelectedParicipants } from "./func";

const AddParticpationForm = ({ show, onHide, onAdd, program }: { show: boolean, onHide: any, onAdd: any, program: any }) => {

    const [loading, setLoading] = useState(false);
    const [participants, setParticipants] = useState<null | any[]>(null);

    useEffect(()=>{
        if(show){
            initParticipants();
        }
    },[show])

    async function initParticipants(){
        const resp = await getNonSelectedParicipants(program?.id);
        setParticipants(resp);

    }

    const formik = useFormik({
        initialValues: {
            participant: null,
        },
        onSubmit: async (val) => {
            setLoading(true);
            const resp = await addParticipation(program?.id, val.participant!);
            if (resp) {
                toast.success("Added Successfully");
                formik.resetForm();
                onAdd();
                onHide();
            } else {
                toast.error("Something went wrong");
            }
            setLoading(false);
        }
    });

    return (
        <div>
            <ZDialog
                visible={show}
                onHide={() => onHide()}
                header={program?.name}>

                <form onSubmit={formik.handleSubmit}>
                    <ZFormSelect
                        formik={formik}
                        formLabel="Participant"
                        name="participant"
                        options={participants ? participants.map((i: any) => { return { label: `${i.name} (${i.chest_no})`, value: i.id } }) : []}
                        placeHolder="Select Participant"
                        filter
                    />
                    <div className="fullcenter">
                        <ZSubmitButton loadText="Adding"
                            loading={loading} text="Add Particpation" /></div>
                </form>

            </ZDialog>
        </div>
    );
}

export default AddParticpationForm;