import { toCanvas } from 'html-to-image';
import download from "downloadjs";
import {  RefObject } from 'react';





export async function downloadCanvas(posterRef:RefObject<HTMLDivElement>, fileName:string) {
  
  await new Promise((resolve) => setTimeout(resolve, 500));

  await new Promise(requestAnimationFrame);

  const canvas = await toCanvas(posterRef.current!, {
    width: 1000,
    height: 1000,
    cacheBust:false,
    style: {
      transform: 'scale(1)',
      transformOrigin: 'top left',
      width: '1000px',
      height: '1000px',
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 500));
  await new Promise(requestAnimationFrame);

  canvas.toBlob((blob) => {
    if (blob) {
      download(blob, `${fileName}.png`, 'image/png');
    }
  });
 
 


 
}

