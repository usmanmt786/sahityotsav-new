"use client";

import { useFormik } from "formik";
import ImageUpload from "./Image";
import { useState } from "react";
import { isFile } from "@/functions/utils/file";

import { uploadCustomizeImage } from "./func";
import { ZSubmitButton } from "@/components/widgets/Form";
import { updateConfigs } from "../configs/func";
import toast from "react-hot-toast";
import { getPreSignedUrl } from "@/drive/drive";
import { DrivezClient } from "drivez";

const CustomizeForm = ({ configs }: { configs: any }) => {
  const [bgImage, setBgImage] = useState<any>(configs?.heroBg);
  const [aboutImg, setAboutImg] = useState<any>(configs?.aboutImage);
  const [resultImg, setResultImg] = useState<any>(configs?.resultImage);

  const [loading, setLoading] = useState(false);
  const client = new DrivezClient();

  const formik = useFormik({
    initialValues: {},
    onSubmit: async (val) => {
      setLoading(true);

      const values: any = {};

      if (bgImage != null && isFile(bgImage)) {
        const ext = bgImage.name.split(".").pop() as string;
        const filename = `${Date.now()}${Math.floor(
          1000 + Math.random() * 9000
        )}.${ext}`;

        const url = await getPreSignedUrl(filename);

        const uploaded = await client.uploadFile(bgImage, url);

        if (!uploaded) {
          toast.error("Failed to Upload");
          setLoading(false);
          return;
        }
        setBgImage(filename);
        values["heroBg"] = filename;
      }

      if (aboutImg != null && isFile(aboutImg)) {
        const ext = aboutImg.name.split(".").pop() as string;
        const filename = `${Date.now()}${Math.floor(
          1000 + Math.random() * 9000
        )}.${ext}`;

        const url = await getPreSignedUrl(filename);

        const uploaded = await client.uploadFile(aboutImg, url);

        if (!uploaded) {
          toast.error("Failed to Upload");
          setLoading(false);
          return;
        }
        setAboutImg(filename);
        values["aboutImage"] = filename;
      }

      if (resultImg != null && isFile(resultImg)) {
        const ext = resultImg.name.split(".").pop() as string;
        const filename = `${Date.now()}${Math.floor(
          1000 + Math.random() * 9000
        )}.${ext}`;

        const url = await getPreSignedUrl(filename);

        const uploaded = await client.uploadFile(resultImg, url);

        if (!uploaded) {
          toast.error("Failed to Upload");
          setLoading(false);
          return;
        }
        setResultImg(filename);
        values["resultImage"] = filename;
      }

      const resp = await updateConfigs(values);
      if (resp.code === 0) {
        toast.success("Site Customized Successfully");
      } else {
        toast.error(resp.message);
      }

      setLoading(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <ImageUpload
        id="bg"
        width={1920}
        height={1080}
        labelText="Hero Background"
        cur={bgImage}
        onChange={(e: any) => {
          setBgImage(e);
        }}
      />

      <ImageUpload
        id="about"
        width={1000}
        height={1000}
        labelText="About Section Image"
        cur={aboutImg}
        onChange={(e: any) => {
          setAboutImg(e);
        }}
      />

      <ImageUpload
        id="result"
        width={1000}
        height={1000}
        labelText="Result Section Image"
        cur={resultImg}
        onChange={(e: any) => {
          setResultImg(e);
        }}
      />

      <ZSubmitButton
        loading={loading}
        loadText="Saving Changes..."
        text="Update Images"
      />
    </form>
  );
};

export default CustomizeForm;
