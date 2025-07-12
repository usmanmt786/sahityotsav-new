"use client";

import { useState, useRef } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiDownloadCloud } from "react-icons/fi";
import install, { createUser } from "../func";
import toast from "react-hot-toast";
import { MdCheckCircle, MdOutlineError } from "react-icons/md";
import "../style.css";

const InstallButton = () => {
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState(0);
  const [errorStage, setErrorStage] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "text/xml") {
      setSelectedFile(file);
    } else {
      toast.error("Please select a valid XML file");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  async function installAction() {
    setLoading(true);
    setStage(1);
    await new Promise((r) => setTimeout(r, 1500));

    // Stage 2 - File selection
    setStage(2);

    // Wait for file selection
    if (!selectedFile) {
      toast.error("Please select an XML file to continue");
      setLoading(false);
      return;
    }

    // Read the file content
    let fileContent = "";
    try {
      fileContent = await selectedFile.text();
      setStage(3);
    } catch (error) {
      setErrorStage(2);
      toast.error("Failed to read XML file");
      setLoading(false);
      return;
    }

    // Stage 3 - Installation with XML data
    const res = await install(fileContent);
    if (res !== 0) {
      setErrorStage(3);
      toast.error("Failed to install software");
      setLoading(false);
      return;
    } else {
      toast.success("Software installed");
    }

    await new Promise((r) => setTimeout(r, 1000));
    setStage(4);

    // Stage 4 - User creation
    const userRes = await createUser();
    if (!userRes) {
      setErrorStage(4);
      toast.error("Failed to Create User");
      setLoading(false);
      return;
    } else {
      toast.success("User Created");
      await new Promise((r) => setTimeout(r, 1000));
      setStage(5);
      setTimeout(() => window.location.reload(), 2000);
    }

    setLoading(false);
  }

  return (
    <>
      {stage === 0 && (
        <button
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg my-6 flex 
                    justify-center items-center gap-x-3"
          onClick={installAction}
          data-aos="fade-up"
          data-aos-delay="1000"
        >
          {loading ? (
            <>
              <AiOutlineLoading3Quarters className="text-xl animate-spin" />{" "}
              Installing...
            </>
          ) : (
            <>
              <FiDownloadCloud />
              Install Software
            </>
          )}
        </button>
      )}

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".xml,text/xml"
        style={{ display: "none" }}
      />

      <div className="mt-6">
        {stage > 0 && (
          <div className="loadprogress">
            <Load isDone={stage > 1} error={errorStage === 1} /> Getting things
            ready
          </div>
        )}

        {stage === 2 && (
          <div className="loadprogress">
            <div className="flex items-center gap-3">
              <Load isDone={false} error={false} />
              <div>
                <p>Select XML data file</p>
                <button
                  onClick={triggerFileInput}
                  className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded mt-1"
                >
                  {selectedFile ? selectedFile.name : "Select File"}
                </button>
                {selectedFile && (
                  <button
                    onClick={installAction}
                    className="ml-2 text-sm bg-green-100 text-green-700 px-3 py-1 rounded mt-1"
                  >
                    Continue
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {stage > 2 && (
          <div className="loadprogress">
            <Load isDone={stage > 3} error={errorStage === 3} /> Prefilling
            Categories & Programs
          </div>
        )}
        {stage > 3 && (
          <div className="loadprogress">
            <Load isDone={stage > 4} error={errorStage === 4} /> Creating Admin
            User
          </div>
        )}
        {stage > 4 && (
          <div className="loadprogress">
            <Load isDone={stage > 5} error={errorStage === 5} /> Finish
            Installation
          </div>
        )}
      </div>
    </>
  );
};

export default InstallButton;

export function Load({ isDone, error }: { isDone: boolean; error: boolean }) {
  return error ? (
    <MdOutlineError className="text-2xl text-red-700" />
  ) : isDone ? (
    <MdCheckCircle className="text-2xl text-green-700" />
  ) : (
    <AiOutlineLoading3Quarters className="animate-spin" />
  );
}
