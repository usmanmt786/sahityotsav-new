"use client";

import { Team } from "@/models/teams/teampoint_model_v2";
import { CgMediaLive } from "react-icons/cg";
import { MdArrowForwardIos } from "react-icons/md";

const TeamPoints = ({
  points,
}: {
  points: {
    points: Team[];
    id: number;
    after: number | null;
    isFinal: boolean;
  } | null;
}) => {
  if (!points) return <></>;
  const firstThree = points.points.slice(0, 3);
  const remaining = points.points.slice(3);
  if (firstThree.some((x) => x.points < 1)) {
    return <></>;
  }
  return (
    <div className="commonwidth py-14">
      <h1 className="text-3xl font-bold mb-4 border-b pb-2 flex items-center gap-x-3">
        Team Score
        <div className="bg-gbg rounded-full text-sm px-3 py-1 text-white  flex justify-center items-center gap-x-2">
          <CgMediaLive className="animate-ping" /> LIVE
        </div>
      </h1>
      <section className="grid lg:grid-cols-2 gap-8 lg:gap-24">
        <div className="grid place-items-center ">
          <h2>
            {!points.isFinal ? (
              <span className="text-2xl font-bold">
                After {points.after} Results
              </span>
            ) : (
              <span className="text-2xl font-bold">Final Status</span>
            )}
          </h2>
          <section className="w-full">
            {firstThree.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-between items-center text-xl border-b pb-2 "
                  data-aos="fade-right"
                  data-aos-delay={`${index * 200}`}
                  data-aos-duration="500"
                >
                  <section className="flex items-center">
                    <div className="bg-primaryDark fullcenter rounded-lg my-2 h-10 w-10 font-bold mr-2 text-white">
                      {index + 1}
                    </div>
                    <div className="mr-5">{item.team}</div>
                  </section>
                  <div className="font-bold">{item.points}</div>
                </div>
              );
            })}
          </section>
        </div>
        <div className="bg-primary bg-opacity-10 p-5 rounded-xl ring-2 ring-primary overflow-hidden">
          {remaining.map((item, i) => {
            return (
              <div
                key={i}
                className="flex items-center justify-between mb-2 border-white border-b pb-2"
                data-aos="fade-left"
                data-aos-delay={`${(i + 3) * 200}`}
                data-aos-duration="500"
              >
                <p className="text-lg flex gap-x-2 items-center ">
                  <MdArrowForwardIos className="text-primaryDark" />
                  {item.team}
                </p>
                <p className="font-bold">{item.points}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default TeamPoints;
