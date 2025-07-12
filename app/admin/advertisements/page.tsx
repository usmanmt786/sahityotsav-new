import AdvertisementModel from "@/models/advertisements/advertisement_model";
import AdList from "./AdList";


async function AdvertisementsPage() {
  const ads = await AdvertisementModel.getAllAds();

  return (
    <div className="commonwidth">
     
      <AdList ads={ads} />
    </div>
  );
}

export default AdvertisementsPage;
