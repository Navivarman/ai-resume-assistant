import { ArrowRight, Sparkles } from "lucide-react";
import ResumeAnalyzer from "../components/ResumeAnalyzer";

function Home() {
  return (
    <main className="min-h-screen bg-gray-950 px-6 text-white">

      <section className="mx-auto flex max-w-5xl flex-col items-center pt-28 text-center">

        {/* Announcement */}
        <div className="mb-8 flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
          <Sparkles size={16} />
          AI-Powered Career Assistant
        </div>

        {/* Heading */}
        <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          Build a Stronger Resume.
          <span className="block text-violet-400">
            Prepare for Success.
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-2xl text-base leading-7 text-gray-400 md:text-lg">
          Analyze your resume, compare it with job requirements,
          identify missing skills, and prepare for interviews
          with personalized AI-powered insights.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">

          <button className="flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-7 py-3 font-semibold transition hover:bg-violet-500">
            Analyze My Resume
            <ArrowRight size={18} />
          </button>

          <button className="rounded-lg border border-white/20 px-7 py-3 font-semibold text-gray-300 transition hover:bg-white/5">
            Explore Features
          </button>

        </div>

      </section>
      <ResumeAnalyzer />
    </main>
  );
}

export default Home;