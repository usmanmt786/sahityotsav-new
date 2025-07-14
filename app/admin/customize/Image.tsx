import Constants from "@/data/constants";
import { isFile } from "@/functions/utils/file";
import { useState } from "react";
import { TiImage } from "react-icons/ti";

const ImageUpload = ({
  id,
  labelText,
  cur,
  onChange,
  width,
  height,
}: {
  id: string;
  labelText: string;
  cur: any;
  onChange: any;
  width: number;
  height: number;
}) => {
  const [error, setError] = useState<string | null>(null);

  function handleFile(e: any) {
    const ev = e.currentTarget.files;
    if (ev) {
      if (ev.length === 0) {
        return;
      }
      var img: HTMLImageElement;
      img = document.createElement("img");

      img.onload = function () {
        if (img.width !== width && img.height !== height) {
          setError(`Image must be ${width}x${height} px`);
        } else {
          setError("");
          onChange(ev[0]);
        }
      };

      img.src = URL.createObjectURL(ev[0]);
    }
  }

  const imgUrl = isFile(cur)
    ? URL.createObjectURL(cur)
    : cur?.length > 2
    ? `${Constants.DRIVE_URL}${cur}`
    : null;
  return (
    <div className="my-2">
      <h6 className="text-gray-400  mb-1">{labelText}</h6>
      <label
        htmlFor={id}
        className="h-36 border border-primaryDark rounded-lg fullcenter border-dashed bg-primary 
            bg-opacity-10  cursor-pointer "
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className={`fullcenter px-8 border py-2 rounded-full text-xs ${
            imgUrl && "bg-gray-100 bg-opacity-80"
          }`}
        >
          <TiImage className="text-2xl" />

          <span>{imgUrl ? "Change Image" : "Choose Image"} </span>
        </div>
      </label>
      {error && (
        <div className="inline-block bg-red-100 text-red-600 text-xs px-2 py-1 mt-2">
          {error}
        </div>
      )}
      <input
        type="file"
        id={id}
        onChange={(e: any) => handleFile(e)}
        accept="image/png, image/jpeg"
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
