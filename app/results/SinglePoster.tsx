"use client";

import { downloadCanvas } from '@/functions/utils/image';
import { classNames } from 'primereact/utils';
import { useRef } from 'react';

const SinglePoster = ({ id, theme, result, imageUrl, x, y, setDownloading }:
  { id: any, theme: string; result: any, imageUrl: string, x: number, y: number, setDownloading: any }) => {

  const scale = 0.35;
  const program = result[0]?.program;

  const programName = program?.name;
  const cat = program?.category?.name;
  const isDark = theme === "dark";

  const posterRef = useRef(null);


  return (
    <section className='w-full select-none'>
      <div className='flex  justify-center'>
        <section
          style={{
            position: 'relative',
            width: `${1000 * scale}px`,
            height: `${1000 * scale}px`,
          }}
        >





          <div
            id={`${id}`}
            ref={posterRef}

            style={{
              position: 'relative',
              width: '1000px',
              height: '1000px',
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
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
                width: '1000px',
                height: '1000px',
              }}
            >

            </div>
            <div
              style={{
                position: 'absolute',
                left: `${x}px`,
                top: `${y}px`,
              }}
            >
              <h1 className=
                {classNames({
                  "text-[3rem] font-bold": true,
                  "  text-white": isDark,
                  " text-black": !isDark
                })}
              >{programName}</h1>
              <h6 className=
                {classNames({
                  " text-[1.5rem]": true,
                  "  text-white": isDark,
                  " text-black": !isDark
                })}
              >{cat}</h6>
              <section className='mt-10'>
                {
                  result && result.map((rs: any) => {
                    const partic = rs.participant;
                    return <div key={rs.id} className='flex items-center mb-2'>
                      <div className={classNames({
                        " w-20 h-20 fullcenter  text-[2rem] mr-5 font-bold rounded-xl": true,
                        " bg-white text-black": isDark,
                        "bg-black text-white": !isDark
                      })}>{rs.win_place}</div>
                      <div >
                        <h5 className={classNames({
                          "text-[2rem]": true,
                          "text-white": isDark,
                          "text-black": !isDark
                        })}>{partic?.name}</h5>
                        <h6 className=
                          {classNames({
                            "text-[rem]": true,
                            "text-white/80": isDark,
                            "text-black": !isDark
                          })}
                        >{partic?.place}</h6>
                      </div>
                    </div>
                  })
                }
              </section>
            </div>
          </div>
        </section>

      </div>
      <div className="flex justify-center mt-4 ">
        <button
          className='btn gbg text-white'
          onClick={async () => {
            setDownloading(true);

            await downloadCanvas(posterRef, `${cat} ${programName}`);

            setDownloading(false);
          }}>Download</button>
      </div>
    </section>
  )
};

export default SinglePoster;