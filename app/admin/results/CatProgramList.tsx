"use client";

import { getInitials } from "@/functions/utils/string";
import { useState } from "react";
import ZSideBar from "../../../components/common/ZSideBar";
import ViewResults from "./ViewResults";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ZFormSelect } from "@/components/widgets/Form";
import { useFormik } from "formik";
import { Dropdown } from "primereact/dropdown";
import ZDialog from "@/components/common/ZDialog";

type Category = {
  id: number;
  name: string;
};
type Result = {
  id: number;
  program: string;
  category: string;
  count: number;
  programId: number;
};

const CatProgramList = ({
  cats,
  results,
}: {
  cats: Category[];
  results: Result[];
}) => {
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [currentProgram, setCurrentProgram] = useState<{
    programId: number;
    count: number;
  } | null>(null);

  const handleProgramClick = (result: Result) => {
    setCurrentProgram({ programId: result.programId, count: result.count });
  };

  return (
    <div className="space-y-6">
      {/* Category Dropdown */}
      <div className="w-full max-w-xs">
        <Dropdown
          filter={true}
          emptyMessage={"No Category Found"}
          options={cats}
          optionLabel="name"
          optionValue="id"
          value={currentCategory}
          onChange={(e) => {
            setCurrentCategory(e.value);
            setCurrentProgram(null);
          }}
          showClear
          placeholder={"Select Category"}
          className="zselect w-full"
        />
      </div>

      {/* Programs Grid */}
      {(currentCategory
        ? results.filter((rs) => rs.category === currentCategory.name)
        : results
      ).length ? (
        <section className="grid lg:grid-cols-3 gap-6">
          {(currentCategory
            ? results.filter((rs) => rs.category === currentCategory.name)
            : results
          ).map((result: Result) => (
            <div
              key={result.id}
              className="border p-5 rounded cursor-pointer hover:bg-gray-50 transition-colors flex items-center gap-3"
              onClick={() => handleProgramClick(result)}
            >
              <div className="bg-primaryDark fullcenter h-10 w-10 rounded-lg mb-2 text-white font-bold">
                {result.count}
              </div>
              <div>
                <h1 className="font-bold">{result.program}</h1>
                <p className="text-sm text-gray-400">{result.category}</p>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <section className="h-60 grid place-content-center text-base text-gray-400">
          No results published
        </section>
      )}

      {/* Results Sidebar */}
      {/* <ZSideBar
        visible={currentProgram !== null}
        onHide={() => setCurrentProgram(null)}
        header={currentProgram?.name!}
      >
        <ViewResults item={currentProgram} />
      </ZSideBar> */}
      <ZDialog
        visible={currentProgram !== null}
        onHide={() => setCurrentProgram(null)}
        header={`Result ${currentProgram?.count}`}
      >
        <ViewResults item={currentProgram?.programId || null} />
      </ZDialog>
    </div>
  );
};

export default CatProgramList;
