
import {
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Lightbulb,
} from "lucide-react";

function SkillComparison({ match }) {
  const {
    matched_skills = [],
    missing_skills = [],
    uncertain_skills = [],
    recommendations = [],
  } = match;

  return (
    <div className="mt-8 space-y-6">

      {/* Matched Skills */}
      <div className="rounded-xl border border-green-500/30 bg-gray-900 p-6">
        <div className="mb-4 flex items-center gap-2">
          <CheckCircle2 className="text-green-400" />
          <h3 className="text-lg font-semibold text-white">
            Matched Skills ({matched_skills.length})
          </h3>
        </div>

        <div className="space-y-3">
          {matched_skills.map((item, index) => (
            <div key={index} className="rounded-lg bg-gray-800 p-3">
              <p className="font-medium text-green-400">
                {item.skill}
              </p>
              <p className="mt-1 text-sm text-gray-400">
                {item.reason}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Missing Skills */}
      <div className="rounded-xl border border-red-500/30 bg-gray-900 p-6">
        <div className="mb-4 flex items-center gap-2">
          <AlertCircle className="text-red-400" />
          <h3 className="text-lg font-semibold text-white">
            Missing Skills ({missing_skills.length})
          </h3>
        </div>

        <div className="space-y-3">
          {missing_skills.map((item, index) => (
            <div key={index} className="rounded-lg bg-gray-800 p-3">
              <p className="font-medium text-red-400">
                {item.skill}
              </p>
              <p className="mt-1 text-sm text-gray-400">
                {item.reason}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Uncertain Skills */}
      <div className="rounded-xl border border-yellow-500/30 bg-gray-900 p-6">
        <div className="mb-4 flex items-center gap-2">
          <HelpCircle className="text-yellow-400" />
          <h3 className="text-lg font-semibold text-white">
            Uncertain Skills ({uncertain_skills.length})
          </h3>
        </div>

        <div className="space-y-3">
          {uncertain_skills.map((item, index) => (
            <div key={index} className="rounded-lg bg-gray-800 p-3">
              <p className="font-medium text-yellow-400">
                {item.skill}
              </p>
              <p className="mt-1 text-sm text-gray-400">
                {item.reason}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="rounded-xl border border-violet-500/30 bg-gray-900 p-6">
        <div className="mb-4 flex items-center gap-2">
          <Lightbulb className="text-violet-400" />
          <h3 className="text-lg font-semibold text-white">
            AI Recommendations
          </h3>
        </div>

        <ul className="space-y-3">
          {recommendations.map((recommendation, index) => (
            <li
              key={index}
              className="flex gap-3 text-sm text-gray-300"
            >
              <span className="text-violet-400">
                {index + 1}.
              </span>
              {recommendation}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default SkillComparison;
