"use client";

import ZDialog from "@/components/common/ZDialog";
import { ZFormInput, ZSubmitButton } from "@/components/widgets/Form";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { addAd, updateAd, uploadAdImage } from "./func";
import Constants from "@/data/constants";
import { getPreSignedUrl } from "@/drive/drive";
import { DrivezClient } from "drivez";

interface Advertisement {
  id: number;
  name: string;
  image: string;
  subscription: number;
}

export default function AdForm({
  open,
  onClose,
  ad,
}: {
  open: boolean;
  onClose: () => void;
  ad: Advertisement | null;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    ad?.image ? Constants.DRIVE_URL + "uploads/ads/" + ad.image : null
  );
  const [imageError, setImageError] = useState<string | null>(null);
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
    {}
  );
  const client = new DrivezClient();
  const [key, setKey] = useState(Date.now());
  const formik = useFormik({
    initialValues: {
      name: ad?.name || "",
      subscription: ad?.subscription || 0,
    },
    validate: (values) => {
      const errors: Record<string, string> = {};

      if (!values.name.trim()) {
        errors.name = "Name is required";
      }

      if (values.subscription === undefined || values.subscription === null) {
        errors.subscription = "Subscription count is required";
      } else if (
        isNaN(Number(values.subscription)) ||
        Number(values.subscription) < 0
      ) {
        errors.subscription = "Must be a positive number";
      }

      return errors;
    },
    onSubmit: async (values) => {
      if (!imagePreview && !ad?.image) {
        setImageError("Image is required");
        return;
      }

      setLoading(true);
      try {
        let imageUrl = ad?.image || "";
        // Upload new image if selected
        if (fileInputRef.current?.files?.[0]) {
          const image = fileInputRef.current.files[0];
          const ext = image.name.split(".").pop() as string;
          const filename = `${Date.now()}${Math.floor(
            1000 + Math.random() * 9000
          )}.${ext}`;

          const url = await getPreSignedUrl(filename);

          const uploaded = await client.uploadFile(image, url);

          if (!uploaded) {
            toast.error("Failed to Upload");
            setLoading(false);
            return;
          }
          imageUrl = filename;
        }

        // Save advertisement
        const response = ad?.id
          ? await updateAd(
              ad.id,
              values.name,
              imageUrl,
              Number(values.subscription)
            )
          : await addAd(imageUrl, values.name, Number(values.subscription));

        if (!response) {
          throw new Error("Failed to save advertisement");
        }

        toast.success(
          ad?.id ? "Advertisement updated!" : "Advertisement created!"
        );
        router.refresh();
        onClose();
      } catch (error) {
        console.error("Error saving advertisement:", error);
        toast.error("Failed to save advertisement");
      } finally {
        setLoading(false);
      }
    },
  });
  useEffect(() => {
    if (ad) {
      formik.setValues({
        name: ad.name,
        subscription: ad.subscription,
      });
      setImagePreview(Constants.DRIVE_URL +  ad.image);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ad]);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate image type
    if (!file.type.startsWith("image/")) {
      setImageError("Please select an image file");
      return;
    }

    // Validate image dimensions
    const img = new window.Image();
    img.onload = () => {
      if (img.width !== 1000 || img.height !== 200) {
        setImageError("Image must be exactly 1000x200 pixels");
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        setImageError(null);
        const reader = new FileReader();
        reader.onload = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    img.onerror = () => {
      setImageError("Invalid image file");
      setImagePreview(null);
    };
    img.src = URL.createObjectURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFieldBlur = (fieldName: string) => {
    setTouchedFields({ ...touchedFields, [fieldName]: true });
  };

  useEffect(() => {
    if (!open) {
      // Reset form when closing
      formik.resetForm();
      setImagePreview(null);
      setImageError(null);
      setTouchedFields({});
      setKey(Date.now());
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }, [open, ad]);

  return (
    <ZDialog
      visible={open}
      onHide={() => onClose()}
      header={ad?.id ? "Edit Advertisement" : "Add Advertisement"}
    >
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <ZFormInput
          formik={formik}
          formLabel="Name"
          name="name"
          onBlur={() => handleFieldBlur("name")}
        />

        <ZFormInput
          formik={formik}
          formLabel="Subscription Count"
          name="subscription"
          type="number"
          placeHolder="Eg: 10"
          onBlur={() => handleFieldBlur("subscription")}
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Advertisement Image (1000x200px)
          </label>

          <input
            type="file"
            id="image"
            key={key}
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />

          <button
            type="button"
            onClick={triggerFileInput}
            className="bg-primaryDark px-5 py-2 rounded-xl text-white hover:bg-primaryDarker transition-colors"
          >
            {imagePreview ? "Change Image" : "Select Image"}
          </button>

          {imageError && (
            <p className="text-red-500 text-sm mt-1">{imageError}</p>
          )}
        </div>

        {imagePreview && (
          <div className="mt-4 border rounded-lg overflow-hidden">
            <div
              className="relative w-full"
              style={{ aspectRatio: "1000/200" }}
            >
              <img src={imagePreview} alt="Preview" className="object-cover" />
            </div>
            <p className="text-xs text-gray-500 text-center p-2">
              Image Preview (1000x200px)
            </p>
          </div>
        )}

        <div className="flex justify-center pt-4">
          <ZSubmitButton
            loadText={ad?.id ? "Updating..." : "Creating..."}
            loading={loading}
            text={ad?.id ? "Update Advertisement" : "Create Advertisement"}
          />
        </div>
      </form>
    </ZDialog>
  );
}
