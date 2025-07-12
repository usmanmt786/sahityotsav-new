"use client";

import { useState } from "react";
import AdCard from "./AdCard";
import AdForm from "./Adform";

interface Advertisement {
  id: number;
  name: string;
  image: string;
  subscription: number;
  results: {
    program: string;
    category: string;
  }[];
}

export default function AdList({ ads }: { ads: Advertisement[] }) {
  const [currentAd, setCurrentAd] = useState<Advertisement | null>(null);
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl mb-4">Advertisements</h1>
        <button
          onClick={() => {
            setCurrentAd(null);
            setShowForm(true);
          }}
          className="bg-primaryDark px-5 py-3 rounded-xl text-white"
          data-aos="fade-up"
        >
          Add Ad
        </button>
      </div>

      {ads.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ads.map((ad) => (
            <AdCard
              key={ad.id}
              ad={ad}
              onEdit={() => {
                setCurrentAd(ad);
                setShowForm(true);
              }}
              data-aos="fade-up"
            />
          ))}
        </div>
      ) : (
        <div className="h-60 grid place-content-center">
          No advertisements found
        </div>
      )}

      <AdForm
        open={showForm}
        onClose={() => {
          setShowForm(false);
          setCurrentAd(null);
        }}
        ad={currentAd}
      />
    </div>
  );
}
