"use client";

import { useFormik } from "formik";
import { useState } from "react";
import { isFile } from "@/functions/utils/file";
import { updateBrochure, uploadCustomizeImage } from "./func";
import { ZSubmitButton } from "@/components/widgets/Form";
import { updateConfigs } from "../configs/func";
import toast from "react-hot-toast";
import { FaRegFilePdf } from "react-icons/fa";
import { getPreSignedUrl } from "@/drive/drive";
import { DrivezClient } from "drivez";

const BroachureForm = ({ configs }: { configs: any }) => {
  const [brochure, setBrochure] = useState<any>(configs?.brochure);

  const [loading, setLoading] = useState(false);
  const client = new DrivezClient();

  const formik = useFormik({
    initialValues: {},
    onSubmit: async (val) => {
      setLoading(true);

      let fileName = "";

      if (brochure != null && isFile(brochure)) {
        const ext = brochure.name.split(".").pop() as string;
        const filename = `${Date.now()}${Math.floor(
          1000 + Math.random() * 9000
        )}.${ext}`;

        const url = await getPreSignedUrl(filename);

        const uploaded = await client.uploadFile(brochure, url);

        if (!uploaded) {
          toast.error("Failed to Upload");
          setLoading(false);
          return;
        }
        fileName = filename;
      }

      if (!fileName) {
        toast.error("Failed to upload brochure");
        return;
      }
      const resp = await updateBrochure(fileName);
      if (resp.code === 0) {
        toast.success("Brochure updated");
      } else {
        toast.error(resp.message);
      }

      setLoading(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="my-2">
        <h6 className="text-gray-400  mb-1">Event Brochure</h6>
        <label
          htmlFor={"brochure"}
          className="h-32 border border-primaryDark rounded-lg fullcenter 
            border-dashed bg-primary bg-opacity-10 text-gray-500 cursor-pointer text-sm text-center"
        >
          <FaRegFilePdf className="text-2xl" />
          {brochure && isFile(brochure) ? (
            <div className="py-2">{brochure.name}</div>
          ) : brochure &&
            typeof brochure === "string" &&
            brochure.length > 5 ? (
            <div>
              <h5 className=" font-light mt-2">{brochure}</h5>
              <div className="py-1 my-1 border border-primary inline-block px-2">
                Change Brochure
              </div>
            </div>
          ) : (
            <div>Choose Brochure</div>
          )}
        </label>
        <input
          type="file"
          id={"brochure"}
          onChange={(e: any) => setBrochure(e.target.files[0])}
          accept="document/pdf"
          multiple={false}
          className="hidden"
        />
      </div>

      <ZSubmitButton
        loading={loading}
        loadText="Updating Brochure..."
        text="Update Brochure"
      />
    </form>
  );
};

export default BroachureForm;
