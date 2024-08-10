"use client";

import React, { useState } from 'react';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';

const PosterEditor = ({curTheme,x,y, imageUrl, onChange }:{curTheme:string,x:number,y:number,imageUrl:any, onChange:(theme:string,x:number,y:number)=>void}) => {
  const [image] = useImage(imageUrl);
  const [theme, setTheme] = useState(curTheme);
  const frontImgUrl = theme==="light"?"/images/template-text.png":"/images/template-text-w.png";
  const [frontimage] = useImage(frontImgUrl)
  const [textPosition, setTextPosition] = useState({ x,y });

  const handleDragEnd = (e:any) => {
    const scaledX = e.target.x();
    const scaledY = e.target.y();
    const actualX = scaledX / scale;
    const actualY = scaledY / scale;    

    setTextPosition({
        x: actualX,
        y: actualY,
    });

    onChange(theme,actualX,actualY);
  };

  const scale = 0.4; // Scale down the image to make it manageable in the editor

function switchContentImage(){
  const newtheme = theme==="light"?"dark":"light";
   setTheme(`${newtheme}`);
   onChange(newtheme,textPosition.x,textPosition.y);
}

  return (
    <div>
        <section className='flex items-center justify-between my-2 text-xs'>
        <h6>Adjust Content Alignment</h6>
        <button className='gbg px-3 py-1 rounded-md text-white' onClick={switchContentImage}>Change Theme</button>
        </section>
      <section className='fullcenter'>
      <Stage width={1000 * scale} height={1000 * scale}>
        <Layer>
          <Image image={image} width={1000 * scale} height={1000 * scale}cornerRadius={10} />

          <Image image={frontimage} 
           x={textPosition.x * scale}
           y={textPosition.y * scale}
           width={400}
          height={400}
          draggable
          onDragEnd={handleDragEnd}
          scaleX={scale}
          scaleY={scale}
          />

         
        </Layer>
      </Stage>
      </section>
    </div>
  );
};

export default PosterEditor;
