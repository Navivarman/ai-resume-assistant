import {
  UserRound,
  BriefcaseBusiness,
  Target,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

import SkillComparison from "./SkillComparison";
import InterviewQuestions from "./InterviewQuestions";

function ResultsDashboard({ result }) {
  const resume = result.resume_analysis;
  const job = result.job_analysis;
  const match = result.match_report;

  const percentage = match.match_percentage;

  return (
    <section className="mx-auto mt-16 max-w-6xl px-6 pb-24">
      {/* Dashboard Heading */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-violet-400">
          <Sparkles size={20} />
          <span className="text-sm font-medium">AI Analysis Report</span>
        </div>

        <h2 className="mt-3 text-3xl font-bold text-white">
          Your Career Analysis
        </h2>

        <p className="mt-2 text-gray-400">
          Here's how your resume aligns with the job requirements.
        </p>
      </div>

      {/* Candidate and Job Information */}
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
          <div className="flex items-center gap-3">
            <UserRound className="text-violet-400" size={24} />

            <h3 className="font-semibold text-white">Candidate Information</h3>
          </div>

          <h4 className="mt-5 text-xl font-bold text-white">
            {resume.candidate_name || "Candidate"}
          </h4>

          <p className="mt-2 text-sm text-gray-400">
            {resume.education?.[0]?.degree || "Education not available"}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            {resume.education?.[0]?.institution || ""}
          </p>

          <div className="mt-5 flex items-center gap-2 text-sm text-gray-400">
            <CheckCircle2 size={16} className="text-green-400" />
            {resume.skills?.length || 0} skills identified
          </div>
        </div>

        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
          <div className="flex items-center gap-3">
            <BriefcaseBusiness className="text-violet-400" size={24} />

            <h3 className="font-semibold text-white">Target Job</h3>
          </div>

          <h4 className="mt-5 text-xl font-bold text-white">{job.job_title}</h4>

          <p className="mt-2 text-sm text-gray-400">
            {job.required_skills?.length || 0} required skills
          </p>

          <p className="mt-1 text-sm text-gray-500">
            {job.preferred_skills?.length || 0} preferred skills
          </p>
        </div>
      </div>

      {/* Match Overview */}
      <div className="mt-8 rounded-xl border border-gray-800 bg-gray-900 p-6">
        <div className="flex items-center gap-2">
          <Target className="text-violet-400" size={22} />

          <h3 className="text-lg font-semibold text-white">
            Resume Match Overview
          </h3>
        </div>

        <div className="mt-8 grid items-center gap-8 md:grid-cols-2">
          {/* Match Percentage */}
          <div className="flex flex-col items-center justify-center">
            <div
              className="flex h-44 w-44 items-center justify-center rounded-full"
              style={{
                background: `conic-gradient(#8b5cf6 ${percentage}%, #374151 ${percentage}% 100%)`,
              }}
            >
              <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-gray-900">
                <span className="text-4xl font-bold text-white">
                  {percentage}%
                </span>

                <span className="mt-1 text-sm text-gray-400">Match Score</span>
              </div>
            </div>

            <p className="mt-5 text-sm text-gray-400">
              Resume compatibility with target job
            </p>
          </div>

          {/* Skill Statistics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-gray-800 p-4">
              <CheckCircle2 className="mb-3 text-green-400" />

              <p className="text-3xl font-bold text-white">
                {match.matched_skills?.length || 0}
              </p>

              <p className="mt-1 text-sm text-gray-400">Matched Skills</p>
            </div>

            <div className="rounded-lg bg-gray-800 p-4">
              <AlertCircle className="mb-3 text-red-400" />

              <p className="text-3xl font-bold text-white">
                {match.missing_skills?.length || 0}
              </p>

              <p className="mt-1 text-sm text-gray-400">Missing Skills</p>
            </div>

            <div className="rounded-lg bg-gray-800 p-4">
              <Sparkles className="mb-3 text-yellow-400" />

              <p className="text-3xl font-bold text-white">
                {match.uncertain_skills?.length || 0}
              </p>

              <p className="mt-1 text-sm text-gray-400">Uncertain Skills</p>
            </div>

            <div className="rounded-lg bg-gray-800 p-4">
              <BriefcaseBusiness className="mb-3 text-violet-400" />

              <p className="text-3xl font-bold text-white">
                {resume.projects?.length || 0}
              </p>

              <p className="mt-1 text-sm text-gray-400">Projects Found</p>
            </div>
          </div>
        </div>
        {/* Detailed Skill Comparison */}
        <SkillComparison match={match} />
        <InterviewQuestions interviewData={result.interview_questions} />
      </div>
    </section>
  );
}

export default ResultsDashboard;
