import html2canvas from "html2canvas";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import download from 'downloadjs';

export const downloadComponent = async (id:string) => {
    const element = document.getElementById(id);
    if(element){
      // toJpeg(element).then(function (dataUrl) {
      //   download(dataUrl, 'my-node.png');
      // });
       const canvas = await html2canvas(element,
        {
          useCORS: true,
          allowTaint : true
        }
       ),
        data = canvas.toDataURL('image/jpg'),
        link = document.createElement('a');
    
        link.href = data;
        link.download = 'downloaded-image.jpg';
    
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
   
  };