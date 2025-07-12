import { toPng } from "html-to-image";
import download from "downloadjs";
import { RefObject } from "react";

export async function downloadCanvas(
  posterRef: RefObject<HTMLDivElement>,
  fileName: string,
  ad: boolean
) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  await new Promise(requestAnimationFrame);

  const configs = {
    width: 1000,
    height: ad ? 1200 : 1000,
    style: {
      transform: "scale(1)",
      transformOrigin: "top left",
      width: "1000px",
      height: ad ? "1200px" : "1000px",
    },
  };

  await toPng(posterRef.current!, configs);
  await toPng(posterRef.current!, configs);
  await toPng(posterRef.current!, configs);

  const img = await toPng(posterRef.current!, configs);

  await new Promise((resolve) => setTimeout(resolve, 500));
  await new Promise(requestAnimationFrame);

  download(img, `${fileName}.png`, "image/png");
}
