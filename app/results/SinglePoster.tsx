"use client";

import { downloadCanvas } from "@/functions/utils/image";
import { classNames } from "primereact/utils";
import { useRef } from "react";
import { Result } from "../admin/results/func";
import Constants from "@/data/constants";

const SinglePoster = ({
  id,
  theme,
  result,
  imageUrl,
  x,
  y,
  setDownloading,
}: {
  id: any;
  theme: string;
  result: Result;
  imageUrl: string;
  x: number;
  y: number;
  setDownloading: any;
}) => {
  const scale = 0.35;

  const programName = result.program;
  const cat = result.category;
  const isDark = theme === "dark";
  const winners = [
    ...result.firstPrize.map((item) => ({ ...item, prize: 1 })),
    ...result.secondPrize.map((item) => ({ ...item, prize: 2 })),
    ...result.thirdPrize.map((item) => ({ ...item, prize: 3 })),
  ];

  const posterRef = useRef(null);

  return (
    <section className="w-full select-none">
      <div className="flex  justify-center">
        <section
          style={{
            position: "relative",
            width: `${1000 * scale}px`,
            height: `${result.advertisement ? 1200 * scale : 1000 * scale}px`,
          }}
        >
          <div
            id={`${id}`}
            ref={posterRef}
            style={{
              position: "relative",
              width: "1000px",
              height: result.advertisement ? "1200px" : "1000px",
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          >
            {/* <img
              src={imageUrl}
              alt="Poster"
              style={{ width: '1000px', height: '1000px' }}
            /> */}
            <div
              style={{
                backgroundImage: `url(${imageUrl})`,
                width: "1000px",
                height: "1000px",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                left: `${x}px`,
                top: `${y}px`,
              }}
            >
              <h1
                className={classNames({
                  "text-[3rem] font-bold": true,
                  "  text-white": isDark,
                  " text-black": !isDark,
                })}
              >
                {programName}
              </h1>
              <h6
                className={classNames({
                  " text-[1.5rem]": true,
                  "  text-white": isDark,
                  " text-black": !isDark,
                })}
              >
                {cat}
              </h6>
              <section className="mt-10">
                {result &&
                  winners.map((partic) => {
                    return (
                      <div key={partic.chNo} className="flex items-center mb-2">
                        <div
                          className={classNames({
                            " w-20 h-20 fullcenter  text-[2rem] mr-5 font-bold rounded-xl":
                              true,
                            " bg-white text-black": isDark,
                            "bg-black text-white": !isDark,
                          })}
                        >
                          {partic.prize}
                        </div>
                        <div>
                          <h5
                            className={classNames({
                              "text-[2rem]": true,
                              "text-white": isDark,
                              "text-black": !isDark,
                            })}
                          >
                            {partic.name}
                          </h5>
                          <h6
                            className={classNames({
                              "text-[rem]": true,
                              "text-white/80": isDark,
                              "text-black": !isDark,
                            })}
                          >
                            {partic.team}
                          </h6>
                        </div>
                      </div>
                    );
                  })}
              </section>
            </div>
            {result.advertisement && (
              <img
                src={Constants.DRIVE_URL + result.advertisement}
                alt="Ad"
                className="w-full h-auto"
              />
            )}
          </div>
        </section>
      </div>
      <div className="flex justify-center mt-4 ">
        <button
          className="btn gbg text-white"
          onClick={async () => {
            setDownloading(true);

            await downloadCanvas(
              posterRef,
              `${cat} ${programName}`,
              !!result.advertisement
            );

            setDownloading(false);
          }}
        >
          Download
        </button>
      </div>
    </section>
  );
};

export default SinglePoster;
