"use client";

import { ZFormSelect, ZSubmitButton } from "@/components/widgets/Form";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { getProgramByCat, getWinResult } from "./func";
import { LuBadge } from "react-icons/lu";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaIdCardAlt } from "react-icons/fa";
import Posters from "./Posters";
import { getResult, Result } from "../admin/results/func";

const ResultsSection = ({ cats, posters }: { cats: any[]; posters: any[] }) => {
  const [loading, setLoading] = useState(false);
  const [programs, setPrograms] = useState<any[]>([]);

  const [result, setResult] = useState<Result | null | "Not Found">(null);

  const formik = useFormik({
    initialValues: {
      category: null,
      program: null,
    },
    validationSchema: Yup.object({
      category: Yup.number().required("Category is Required"),
      program: Yup.number().required("Program is required"),
    }),
    onSubmit: async (val) => {
      try {
        setLoading(true);
        const resp = await getResult(val.program!);
        setResult(resp);
      } catch (error) {
        console.error(error);
        setResult("Not Found");
      } finally {
        setLoading(false);
      }
    },
  });

  async function getPrograms(catId: number) {
    const resp = await getProgramByCat(catId);
    setPrograms(resp);
  }
  useEffect(() => {
    setResult(null);
  }, [formik.values.category]);
  return (
    <div className="w-full">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-primary w-full lg:w-5/12 mx-auto my-10 bg-opacity-10 lg:ring-2 ring-primary p-8 rounded-xl"
      >
        <h1 className="text-2xl font-bold text-primaryDark">Check Results</h1>
        <ZFormSelect
          formik={formik}
          formLabel="Category"
          name="category"
          options={cats.map((cat) => ({ label: cat.name, value: cat.id }))}
          filter
          onChange={(e: any) => {
            formik.setFieldValue("category", e.value);
            formik.setFieldValue("program", null);
            setResult(null);
            getPrograms(e.value);
          }}
        />
        <ZFormSelect
          formik={formik}
          formLabel="Program"
          name="program"
          options={programs.map((p) => ({ label: p.name, value: p.id }))}
          disabled={programs.length === 0}
          filter
        />
        <div className="fullcenter mt-2">
          <ZSubmitButton
            loadText="Fetching Results.."
            loading={loading}
            text="Get Results"
          />

          {result && (
            <section className="mt-3">
              {result === "Not Found" ? (
                <div className="bg-red-50 px-4 py-3 rounded-md text-red-600 select-none fullcenter">
                  <MdOutlinePendingActions className="text-3xl mb-1" />
                  Results Not Declared
                </div>
              ) : (
                <div>
                  <h1 className="text-xl mb-2">Results</h1>
                  <section className="space-y-2">
                    {result.firstPrize.map((winner) => {
                      return (
                        <div
                          key={winner.chNo}
                          className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border hover:bg-gray-100 transition-colors"
                        >
                          <section className="flex items-center gap-3">
                            <section className="relative h-10 w-10 bg-green-700 flex items-center justify-center rounded-xl text-white">
                              <LuBadge className="text-2xl" />
                              <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white text-green-700 rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                                1
                              </div>
                            </section>

                            <div>
                              <p className="font-medium">
                                {winner.name}

                                <span className="text-xs text-gray-500 ml-2">
                                  ({winner.team})
                                </span>
                              </p>
                              <p className="text-xs text-gray-600">
                                Chest No: {winner.chNo}
                              </p>
                            </div>
                          </section>
                        </div>
                      );
                    })}
                    {result.secondPrize.map((winner) => {
                      return (
                        <div
                          key={winner.chNo}
                          className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border hover:bg-gray-100 transition-colors"
                        >
                          <section className="flex items-center gap-3">
                            <section className="relative h-10 w-10 bg-blue-700 flex items-center justify-center rounded-xl text-white">
                              <LuBadge className="text-2xl" />
                              <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white text-blue-700 rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                                2
                              </div>
                            </section>

                            <div>
                              <p className="font-medium">
                                {winner.name}

                                <span className="text-xs text-gray-500 ml-2">
                                  ({winner.team})
                                </span>
                              </p>
                              <p className="text-xs text-gray-600">
                                Chest No: {winner.chNo}
                              </p>
                            </div>
                          </section>
                        </div>
                      );
                    })}
                    {result.thirdPrize.map((winner) => {
                      return (
                        <div
                          key={winner.chNo}
                          className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border hover:bg-gray-100 transition-colors"
                        >
                          <section className="flex items-center gap-3">
                            <section className="relative h-10 w-10 bg-yellow-700 flex items-center justify-center rounded-xl text-white">
                              <LuBadge className="text-2xl" />
                              <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white text-yellow-700 rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                                3
                              </div>
                            </section>

                            <div>
                              <p className="font-medium">
                                {winner.name}

                                <span className="text-xs text-gray-500 ml-2">
                                  ({winner.team})
                                </span>
                              </p>
                              <p className="text-xs text-gray-600">
                                Chest No: {winner.chNo}
                              </p>
                            </div>
                          </section>
                        </div>
                      );
                    })}
                  </section>
                </div>
              )}
            </section>
          )}
        </div>
      </form>

      {result && result !== "Not Found" && (
        <section>
          <Posters posters={posters} result={result} />
        </section>
      )}
    </div>
  );
};

export default ResultsSection;
