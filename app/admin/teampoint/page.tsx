import Header from "./header";
import { getTeamPoint } from "./func";

const TeamPoint = async () => {
  const teamPoint = await getTeamPoint();

  return (
    <div className="commonwidth py-6">
      <Header resultId={teamPoint?.id || null} />

      {teamPoint ? (
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-700">
              {teamPoint.isFinal
                ? "Final Rankings"
                : `Rankings after ${teamPoint.after}`}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {teamPoint.points.length} teams ranked by points
            </p>
          </div>

          <div className="divide-y divide-gray-100">
            {teamPoint.points.map((item, index) => (
              <div
                key={`${item.team}-${index}`}
                className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span
                      className={`flex items-center justify-center h-8 w-8 rounded-full text-sm font-medium ${
                        index < 3
                          ? "bg-primaryDark text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <h2 className="font-medium text-gray-800">{item.team}</h2>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-primaryDark">
                      {item.points}
                    </span>
                    <span className="text-gray-400 text-sm">pts</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="text-gray-400 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-1">
            No rankings published yet
          </h3>
          <p className="text-gray-500 text-sm">
            Team points will appear here once they&apos;re published
          </p>
        </div>
      )}
    </div>
  );
};

export default TeamPoint;
