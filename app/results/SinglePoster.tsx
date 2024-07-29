"use client";

import { downloadComponent } from '@/functions/utils/image';

const SinglePoster = ({ result, imageUrl, x,y }:
    {result:any,imageUrl:string, x:number,y:number}) => {

    const scale = 0.35; 
    const program = result[0]?.program;
    
    const programName = program?.name;
    const cat  = program?.category?.name;

    return (
    <section>
         <div>
          <section
           style={{
            position: 'relative',
            width: `${1000 * scale}px`,
            height: `${1000 * scale}px`,
          }}
          >

          <div
            id="img2"
            style={{
              position: 'relative',
              width: '1000px',
              height: '1000px',
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
          >
            <img
              src={imageUrl}
              alt="Poster"
              style={{ width: '1000px', height: '1000px' }}
            />
            <div
              style={{
                position: 'absolute',
                left: `${x}px`,
                top: `${y}px`,
              }}
            >
              <h1 className='text-[3rem] font-bold'>{programName}</h1>
              <h6 className='text-[1.5rem]'>{cat}</h6>
              <section className='mt-10'>
                {
                    result && result.map((rs:any)=>{
                        const partic = rs.participant;
                        return <div key={rs.id} className='flex items-center mb-2'>
                            <div className='bg-black w-20 h-20 fullcenter text-white text-[2rem] mr-5'>{rs.win_place}</div>
                            <div>
                                <h5 className='text-[2rem]'>{partic?.name}</h5>
                                <h6 className='text-[1.5rem]'>{partic?.place}</h6>
                            </div>
                        </div>
                    })
                }
              </section>
            </div>
          </div>
          </section>
        
        </div>
        <div className='fullcenter mt-4'>
         <button
          className='btn gbg text-white'
            onClick={() => {
                downloadComponent("img2")
            }}>Download</button>
         </div>
    </section>   
    )
};

export default SinglePoster;
