import TeamPointModel from "@/models/teams/teampoint_model";
import PointForm from "./PointForm";

const TeamPoint = async () => {
    const teamPoint = await TeamPointModel.getAllTeamPoints();
    return (
        <div className="commonwidth ">
            <h1 className="text-2xl mb-4 font-bold">Team Points</h1>
            <PointForm curPoints={teamPoint}/>
            
        </div>
    );
}

export default TeamPoint;