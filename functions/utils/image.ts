import html2canvas from "html2canvas";

export const downloadComponent = async (id:string) => {
    const element = document.getElementById(id);
    if(element){
       const canvas = await html2canvas(element),
        data = canvas.toDataURL('image/jpg'),
        link = document.createElement('a');
    
        link.href = data;
        link.download = 'downloaded-image.jpg';
    
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
   
  };