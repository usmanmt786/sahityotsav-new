"use client";

import ZDialog from "@/components/common/ZDialog";
import { TeamPoint } from "@/models/teams/teampoint_model_v2";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiUpload, FiLoader } from "react-icons/fi";
import { deleteTeamPoint, updateTeamPoint } from "./func";
import { MdSettingsBackupRestore } from "react-icons/md";

function Header({ resultId }: { resultId: number | null }) {
  const [isLoading, setIsLoading] = useState(false);
  const [key, setKey] = useState(Date.now());
  const [extractedData, setExtractedData] = useState<TeamPoint | null>(null);
  const [isUpdating, setUpdating] = useState(false);
  const [isRollingBack, setRollingBack] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsLoading(true);
      const file = e.target?.files?.[0];
      setKey(Date.now());

      if (!file) return;

      // Validate file type
      const validTypes = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/csv",
      ];
      if (!validTypes.includes(file.type)) {
        throw new Error("Please upload a valid Excel or CSV file");
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "team");

      const res = await axios.post("/api/convert", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res?.data?.success) {
        setExtractedData(res.data.data);
        toast.success("Data extracted successfully!");
      } else {
        throw new Error(res.data.message || "Failed to extract data");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Error extracting data"
      );
    } finally {
      setIsLoading(false);
      e.target.value = ""; // Reset file input
    }
  };

  const handleUpdate = async (data: TeamPoint) => {
    const finalInput = document.getElementById("final") as HTMLInputElement;
    try {
      setUpdating(true);

      const isFinal = finalInput.checked;

      const res = await updateTeamPoint(data.after, data.teams, isFinal);
      if (res) {
        toast.success("Data updated successfully!");
        setExtractedData(null);
        finalInput.checked = false;
      } else {
        throw new Error("Failed to update data");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Error updating data"
      );
    } finally {
      setUpdating(false);
    }
  };
  const handleRollback = async () => {
    if (!resultId) return;
    try {
      setRollingBack(true);
      const res = await deleteTeamPoint(resultId);
      if (res) {
        toast.success("Data updated successfully!");
      } else {
        throw new Error("Failed to update data");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Error updating data"
      );
    } finally {
      setRollingBack(false);
    }
  };
  return (
    <>
      {/* Fullscreen Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center">
            <FiLoader className="animate-spin text-4xl text-primaryDark mb-4" />
            <p className="text-lg font-medium">
              {isLoading ? "Processing the file..." : "Rolling Back..."}
            </p>
            <p className="text-sm text-gray-500 mt-2">Please wait</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Team Points
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and update team rankings
          </p>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          {resultId && (
            <button
              className={`flex items-center gap-2 bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl text-white transition-colors cursor-pointer ${
                isRollingBack || isLoading
                  ? "opacity-70 pointer-events-none"
                  : ""
              }`}
              onClick={handleRollback}
              disabled={isLoading || isRollingBack}
            >
              <MdSettingsBackupRestore
                className={`${isRollingBack ? "animate-spin" : ""}`}
              />
              {isRollingBack ? "Rolling Back..." : "Rollback"}
            </button>
          )}
          <div className="relative ">
            <label
              htmlFor="file"
              className={`flex items-center gap-2 bg-primaryDark hover:bg-primaryDarker px-5 py-3 rounded-xl text-white transition-colors cursor-pointer ${
                isLoading ? "opacity-70 pointer-events-none" : ""
              }`}
            >
              {isLoading ? <FiLoader className="animate-spin" /> : <FiUpload />}
              <span>{isLoading ? "Uploading..." : "Update Points"}</span>
            </label>

            <input
              type="file"
              id="file"
              accept=".xlsx,.xls,.csv"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileUpload}
              disabled={isLoading}
              key={key}
            />
          </div>
        </div>
      </div>

      <ZDialog
        visible={!!extractedData}
        onHide={() => setExtractedData(null)}
        header={`Team Points After ${extractedData?.after}`}
      >
        {extractedData?.teams?.length ? (
          <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
            {extractedData.teams.map((team, index) => (
              <div
                key={`${team.team}-${index}`}
                className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-primaryDark flex items-center justify-center rounded-lg h-10 w-10 font-bold text-white">
                    {index + 1}
                  </div>
                  <div className="font-medium text-gray-800">{team.team}</div>
                </div>
                <div className="font-bold text-gray-800">{team.points}</div>
              </div>
            ))}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="final"
                id="final"
                className="rounded-md border-gray-300 text-primaryDark focus:ring-primaryDark"
              />
              <label
                htmlFor="final"
                className="text-sm font-medium text-gray-700"
              >
                Final Result
              </label>
            </div>
            <button
              className={`flex items-center gap-2 w-full justify-center bg-primaryDark hover:bg-primaryDarker px-5 py-3 rounded-xl text-white transition-colors cursor-pointer ${
                isUpdating ? "opacity-70 pointer-events-none" : ""
              }`}
              disabled={isUpdating}
              onClick={() => handleUpdate(extractedData)}
            >
              {isUpdating ? (
                <FiLoader className="animate-spin" />
              ) : (
                <FiUpload />
              )}
              <span>{isUpdating ? "Uploading..." : "Update Points"}</span>
            </button>
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="text-gray-500">No team data available</p>
          </div>
        )}
      </ZDialog>
    </>
  );
}

export default Header;
