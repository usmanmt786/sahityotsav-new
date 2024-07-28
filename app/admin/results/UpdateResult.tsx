import ZDialog from "@/components/common/ZDialog";
import { ZFormInput, ZFormSelect, ZSubmitButton } from "@/components/widgets/Form";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getParticipationsResult, updateResult } from "./func";
import { RESULT_WIN_PLACES } from "@/data/result_const";

const UpdateResult = ({  onHide, onAdd, partic }: {  onHide: any, onAdd: any, partic: any }) => {

    const [loading, setLoading] = useState(false);
    const [participants, setParticipants] = useState<null | any[]>(null);

    useEffect(() => {
        if (partic) {
            formik.setValues({
                winPlace: partic.win_place,
                score: partic.score,
                grade: partic.grade
            });
        }
    }, [partic]); 

    const formik = useFormik({
        initialValues: {
            winPlace:0,
            score: 0,
            grade: ''
        },
        onSubmit: async (val) => {
            setLoading(true);
            const resp = await updateResult(partic?.id, val.winPlace, val.score, val.grade);
            if (resp) {
                toast.success("Result Updated");
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
                visible={partic!==null}
                onHide={() => onHide()}
                header={""}>
                  <div className="border-b pb-2">
        <h1 className="text-xl font-bold">{partic?.participant?.name} ({partic?.participant?.chest_no})</h1>
        <h6 className="text-gray-400 text-sm">{partic?.program?.name} - {partic?.program?.category?.name}</h6>
    </div>

                <form onSubmit={formik.handleSubmit}>
                    <ZFormSelect
                    formik={formik}
                    formLabel="Place"
                    name="winPlace"
                    options={RESULT_WIN_PLACES}
                    />
                    <div className="border p-5 mt-5 rounded-xl">
                        <h6 className="text-xs text-gray-400">Optional Fields</h6>
                        <ZFormInput
                        formik={formik}
                    formLabel="Score"
                    name="score"
                    type="number"
                    placeHolder="Eg: 10"
                        />
                  
                        <ZFormInput
                        formik={formik}
                    formLabel="Grade"
                    name="grade"
                    placeHolder="Eg: A+"
                        />
                    </div>
                    <div className="fullcenter">
                        <ZSubmitButton loadText="Updating..."
                            loading={loading} text="Update Result" /></div>
                </form>

            </ZDialog>
        </div>
    );
}

export default UpdateResult;