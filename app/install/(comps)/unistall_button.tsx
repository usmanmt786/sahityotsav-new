"use client";

import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";
import { uninstall } from "../func";
import toast from "react-hot-toast";
import { MdCheckCircle, MdOutlineError } from "react-icons/md";
import { BsRepeat } from "react-icons/bs";
import Link from "next/link";

const UninstallButton = ({ logged }: { logged: boolean }) => {
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [stage, setStage] = useState(0);
  const [errorStage, setErrorStage] = useState(0);

  async function uninstallAction() {
    setShowConfirm(false);
    setLoading(true);
    setStage(1);

    try {
      await new Promise((r) => setTimeout(r, 1000));
      setStage(2);

      const res = await uninstall();
      if (res !== 0) {
        setErrorStage(2);
        toast.error("Failed to uninstall software");
        return;
      } else {
        toast.success("Software uninstalled");
      }

      await new Promise((r) => setTimeout(r, 1000));
      setStage(3);
      setTimeout(() => window.location.reload(), 2000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[100svh] flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <MdCheckCircle className="text-6xl text-green-700 mx-auto" />
        <h1 className="text-xl font-extralight my-4">
          Software is already installed
        </h1>
      </div>

      <div className="flex flex-col items-center gap-4 w-full max-w-md">
        <div className="flex gap-4 w-full">
          {!loading && (
            <Link
              href="/"
              className="bg-green-700 px-5 py-3 rounded-xl text-white text-center flex-1"
            >
              Go to Home
            </Link>
          )}
          {logged && (
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex-1 flex 
              justify-center items-center gap-x-3 min-w-[180px]"
              onClick={() => logged && setShowConfirm(true)}
              disabled={loading}
            >
              {loading ? (
                <>
                  <AiOutlineLoading3Quarters className="text-xl animate-spin" />
                  Uninstalling...
                </>
              ) : errorStage ? (
                <>
                  <BsRepeat />
                  Retry
                </>
              ) : (
                <>
                  <FiTrash2 />
                  Uninstall
                </>
              )}
            </button>
          )}
        </div>

        {/* Progress indicators */}
        <div className="w-full mt-6 space-y-3">
          {stage > 0 && (
            <div className="flex items-center gap-2">
              <Load isDone={stage > 1} error={errorStage === 1} />
              <span>Preparing uninstallation</span>
            </div>
          )}
          {stage > 1 && (
            <div className="flex items-center gap-2">
              <Load isDone={stage > 2} error={errorStage === 2} />
              <span>Removing software components</span>
            </div>
          )}
          {stage > 2 && (
            <div className="flex items-center gap-2">
              <Load isDone={stage > 3} error={errorStage === 3} />
              <span>Cleaning up</span>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Dialog Overlay */}
      {showConfirm && logged && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ">
          <div className="bg-zinc-200 p-6 rounded-lg max-w-md w-full ">
            <h3 className="text-xl font-bold mb-4">Confirm Uninstall</h3>
            <p className="mb-6">
              Are you sure you want to uninstall the software? This action
              cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-red-600 text-white  hover:bg-red-700 flex items-center gap-2 rounded-lg"
                onClick={uninstallAction}
              >
                <FiTrash2 />
                Confirm Uninstall
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UninstallButton;

function Load({ isDone, error }: { isDone: boolean; error: boolean }) {
  return error ? (
    <MdOutlineError className="text-2xl text-red-700" />
  ) : isDone ? (
    <MdCheckCircle className="text-2xl text-green-700" />
  ) : (
    <AiOutlineLoading3Quarters className="text-2xl animate-spin" />
  );
}
