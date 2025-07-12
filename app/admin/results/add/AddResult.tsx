"use client";
import toast from "react-hot-toast";
import axios from "axios";
import { use, useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { addResult, getActiveAdvertisements } from "./func";

export interface ProgramResult {
  chNo: string;
  name: string;
  team: string;
  prize?: 1 | 2 | 3;
  grade?: string;
  points?: number;
}

export interface ExtractedProgramData {
  resultCount: number;
  category: string;
  program: string;
  firstPrize: ProgramResult[];
  secondPrize: ProgramResult[];
  thirdPrize: ProgramResult[];
  others: ProgramResult[];
}
interface Advertisement {
  id: number;
  name: string;
}

function AddResult() {
  const [extractedData, setExtractedData] =
    useState<ExtractedProgramData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [key, setKey] = useState(Date.now());
  const [isAdding, setIsAdding] = useState(false);
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [selectedAd, setSelectedAd] = useState<Advertisement | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsLoading(true);
      const file = e.target?.files?.[0];
      setKey(Date.now());
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "program");

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
  const handleAddResult = async () => {
    if (!extractedData) return toast.error("Not result loaded");
    try {
      setIsAdding(true);
      const res = await addResult(extractedData, selectedAd?.id);
      if (res) {
        toast.success("Results added successfully!");
        setExtractedData(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        throw new Error("Failed adding Result");
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error instanceof Error ? error.message : "Result adding failed"
      );
    } finally {
      setIsAdding(false);
    }
  };

  const handleClearData = () => {
    setExtractedData(null);
    setSelectedAd(null);
  };

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await getActiveAdvertisements();
        setAds(res);
      } catch (error) {
        console.error(error);
      }
    };
    if (extractedData) {
      fetchAds();
    } else {
      setSelectedAd(null);
      setAds([]);
      
    }
  }, [extractedData]);

  return (
    <div className="border border-gray-200 rounded-md p-5 max-w-4xl mx-auto transition-all duration-300">
      <h1 className="text-2xl font-bold text-center">Add Result</h1>

      <form className="flex flex-col gap-5 pt-5">
        <div className="flex flex-col items-center gap-4">
          <input
            type="file"
            id="file"
            accept=".xlsx,.xls,.csv"
            className="border-2 border-primaryDark rounded-md p-2 hidden"
            onChange={handleFileUpload}
            disabled={isLoading}
            key={key}
          />
          <div className="flex gap-4 flex-wrap">
            <label
              htmlFor="file"
              className={`px-4 py-2 rounded-lg shadow-xl text-white flex justify-center items-center 
              group ring-primaryDark hover:ring-2 duration-300 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
              }`}
            >
              {isLoading ? "Processing..." : "Select File"}
            </label>

            {extractedData && (
              <button
                type="button"
                onClick={handleClearData}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
                disabled={isAdding}
              >
                Clear Data
              </button>
            )}
          </div>
        </div>
      </form>

      {isLoading && (
        <div className="mt-6 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {extractedData && (
        <div className="mt-6 space-y-6 transition-all duration-300 ease-in-out">
          <div className="w-full max-w-xs mx-auto">
            {ads.length && (
              <Dropdown
                emptyMessage={"No Active ads"}
                options={ads}
                optionLabel="name"
                optionValue="id"
                value={selectedAd}
                onChange={(e) => {
                  setSelectedAd(e.value);
                }}
                placeholder={"Select an Ad"}
                className="zselect w-full"
                showClear
                disabled={isAdding}
              />
            )}
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded shadow">
                <p className="text-gray-500">Category</p>
                <p className="font-medium">{extractedData.category}</p>
              </div>
              <div className="bg-white p-3 rounded shadow">
                <p className="text-gray-500">Program</p>
                <p className="font-medium">{extractedData.program}</p>
              </div>
              <div className="bg-white p-3 rounded shadow">
                <p className="text-gray-500">Result Count</p>
                <p className="font-medium">{extractedData.resultCount}</p>
              </div>
            </div>
          </div>

          {extractedData.firstPrize.length > 0 && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h2 className="text-xl font-semibold mb-3 text-green-800">
                First Prize Winners
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                  <thead className="bg-green-100">
                    <tr>
                      <th className="py-2 px-4">Ch No</th>
                      <th className="py-2 px-4 w-5/12" align="left">
                        Name
                      </th>
                      <th className="py-2 px-4 w-5/12" align="left">
                        Team
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {extractedData.firstPrize.map((winner, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-white" : "bg-green-50"}
                      >
                        <td className="py-2 px-4 text-center">{winner.chNo}</td>
                        <td className="py-2 px-4">{winner.name}</td>
                        <td className="py-2 px-4">{winner.team}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {extractedData.secondPrize.length > 0 && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h2 className="text-xl font-semibold mb-3 text-blue-800">
                Second Prize Winners
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="py-2 px-4">Ch No</th>
                      <th className="py-2 px-4 w-5/12" align="left">
                        Name
                      </th>
                      <th className="py-2 px-4 w-5/12" align="left">
                        Team
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {extractedData.secondPrize.map((winner, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-white" : "bg-blue-50"}
                      >
                        <td className="py-2 px-4 text-center">{winner.chNo}</td>
                        <td className="py-2 px-4">{winner.name}</td>
                        <td className="py-2 px-4 ">{winner.team}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {extractedData.thirdPrize.length > 0 && (
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
              <h2 className="text-xl font-semibold mb-3 text-yellow-800">
                Third Prize Winners
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                  <thead className="bg-yellow-100">
                    <tr>
                      <th className="py-2 px-4">Ch No</th>
                      <th className="py-2 px-4 w-5/12" align="left">
                        Name
                      </th>
                      <th className="py-2 px-4 w-5/12" align="left">
                        Team
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {extractedData.thirdPrize.map((winner, index) => (
                      <tr
                        key={index}
                        className={
                          index % 2 === 0 ? "bg-white" : "bg-yellow-50"
                        }
                      >
                        <td className="py-2 px-4 text-center">{winner.chNo}</td>
                        <td className="py-2 px-4">{winner.name}</td>
                        <td className="py-2 px-4">{winner.team}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <button
            className={`mt-4 w-full px-4 py-3 rounded-lg shadow-xl text-white flex justify-center items-center 
              group ring-primaryDark hover:ring-2 duration-300 ${
                isAdding
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
              }`}
            onClick={handleAddResult}
          >
            Add Result
          </button>
        </div>
      )}
    </div>
  );
}

export default AddResult;
