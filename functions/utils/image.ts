import { toPng } from 'html-to-image';
import download from "downloadjs";

export async function downloadComponent (id: string, name: string){
  const element = document.getElementById(id);
  if (element) {
    const originalTransform = element.style.transform; // Save original transform
    element.style.transform = "scale(1)";
   await toPng(element,{
      canvasHeight: 1000,
      canvasWidth: 1000
    })
    .then(function (dataUrl) {
      download(dataUrl, `${name}.png`);
    }).finally(() => {
      element.style.transform = originalTransform; // Restore original transform
    });

  }
  await new Promise(resolve => setTimeout(resolve, 500));

  return true;
};
