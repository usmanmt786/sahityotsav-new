"use client";

import Constants from "@/data/constants";
import { useState } from "react";
import { deleteAd } from "./func";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { MdOpenInNew } from "react-icons/md";
import ZDialog from "@/components/common/ZDialog";
interface Advertisement {
  id: number;
  name: string;
  image: string;
  subscription: number;
  results: { program: string; category: string }[];
}

export default function AdCard({
  ad,
  onEdit,
  ...props
}: {
  ad: Advertisement;
  onEdit: () => void;
} & React.HTMLAttributes<HTMLDivElement>) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await deleteAd(ad.id);
      if (res) {
        toast.success("Ad deleted successfully");
        router.refresh();
      } else {
        throw new Error("Failed deleting Ad");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed deleting Ad");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
      {...props}
    >
      <div className="relative w-full h-auto bg-gray-100">
        {ad.image && (
          <img
            src={Constants.DRIVE_URL + ad.image}
            alt={ad.name}
            className="object-cover"
          />
        )}
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{ad.name}</h3>
        <p className="text-gray-600 text-sm ">
          Subscription Limit: {ad.subscription}
        </p>
        <p className="text-gray-600 text-sm">
          Results Allocated: {ad.results.length}
          {ad.results.length > 0 && (
            <MdOpenInNew
              className="ml-1 text-sm text-blue-500 hover:text-blue-600 duration-200 cursor-pointer inline"
              onClick={() => setIsDialogOpen(true)}
            />
          )}
        </p>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onEdit}
            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
      <ZDialog
        visible={isDialogOpen}
        onHide={() => setIsDialogOpen(false)}
        header={`Allocated results for '${ad.name}'`}
      >
        <div className="space-y-4 mt-4">
          {ad.results.map((result) => (
            <div key={result.program} className="flex items-center space-x-2">
              <span>{result.program}</span>
              <span>-</span>
              <span>{result.category}</span>
            </div>
          ))}
        </div>
      </ZDialog>
    </div>
  );
}
