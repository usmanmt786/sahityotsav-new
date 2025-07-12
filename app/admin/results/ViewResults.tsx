"use client";

import { useEffect, useState } from "react";
import { MdPerson } from "react-icons/md";
import { LuBadge } from "react-icons/lu";
import { HiChevronRight } from "react-icons/hi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { getResult, Result } from "./func";

const ViewResults = ({ item }: { item: number | null }) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchResults = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const res = await getResult(id);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (item) {
      fetchResults(item);
    }
  }, [item]);

  if (loading) {
    return (
      <div className="space-y-4 p-4">
        <Skeleton height={40} count={5} className="mb-2" />
      </div>
    );
  }

  if (error) {
    return <div className="h-[50vh] fullcenter text-red-500">{error}</div>;
  }

  if (!item) return null;
  if (loading) {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <div className="h-[50vh] fullcenter" key={i}>
          <Skeleton height={40} count={5} className="mb-2" />
        </div>
      ));
  }

  if (!result) {
    return (
      <div className="h-[50vh] fullcenter flex-col gap-2 text-gray-500">
        <MdPerson className="text-4xl" />
        <p>Results not published yet</p>
      </div>
    );
  }
  return (
    <div className="py-4">
      <div className="mb-4 p-3 bg-gray-50 flex items-center gap-4 ">
        <div>
          <h2 className="font-bold text-lg">{result.program}</h2>
          <p className="text-sm text-gray-600">Category: {result.category}</p>
        </div>
      </div>

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
  );
};

export default ViewResults;
