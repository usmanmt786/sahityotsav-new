import GuestLayout from "@/components/layout/GuestLayout";
import HomeHero from "./(comps)/HomeHero";
import HomeAbout from "./(comps)/About";
import ResultSection from "./(comps)/ResultSection";
import CoreConfigs from "@/models/configs/core_configs_model";
import LiveStream from "./(comps)/LiveStream";
import BrochureDownload from "./(comps)/BrochureDownload";
import TeamPoints from "./(comps)/TeamPoints";
import TeamPointModel from "@/models/teams/teampoint_model";
import { getTeamPoint } from "../admin/teampoint/func";

const HomePage = async() => {
  const configs = await CoreConfigs.getCoreConfigs();
  const teamPoint = await getTeamPoint()

  
  return (
    <GuestLayout>
      <HomeHero configs={configs}/>
      <LiveStream />
      <TeamPoints points={teamPoint}/>
      <ResultSection  configs={configs}/>

      <HomeAbout  configs={configs}/>
      
      <BrochureDownload configs={configs}/>
    </GuestLayout>
  );
}

export default HomePage;

export const revalidate = 60;
