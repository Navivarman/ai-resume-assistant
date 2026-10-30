
import { useState } from "react";
import {
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Brain,
} from "lucide-react";

function InterviewQuestions({ interviewData }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const questions = interviewData?.questions || [];

  const toggleQuestion = (index) => {
    setExpandedIndex(
      expandedIndex === index ? null : index
    );
  };

  const difficultyColor = {
    Easy: "text-green-400 bg-green-500/10",
    Medium: "text-yellow-400 bg-yellow-500/10",
    Hard: "text-red-400 bg-red-500/10",
  };

  if (questions.length === 0) {
    return null;
  }

  return (
    <section className="mt-10 space-y-6">

      <div>
        <div className="flex items-center gap-2">
          <Brain className="text-violet-400" size={24} />
          <h2 className="text-2xl font-bold text-white">
            Interview Preparation
          </h2>
        </div>

        <p className="mt-2 text-sm text-gray-400">
          Personalized interview questions based on your resume
          and target job.
        </p>
      </div>

      <div className="space-y-4">
        {questions.map((item, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl border border-gray-700 bg-gray-900"
          >
            <button
              type="button"
              onClick={() => toggleQuestion(index)}
              className="flex w-full items-start justify-between gap-4 p-5 text-left"
            >
              <div className="flex-1">
                <p className="mb-3 text-xs font-semibold text-violet-400">
                  QUESTION {index + 1}
                </p>

                <h3 className="font-medium leading-relaxed text-white">
                  {item.question}
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-400">
                    {item.category}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      difficultyColor[item.difficulty] ||
                      "bg-gray-700 text-gray-300"
                    }`}
                  >
                    {item.difficulty}
                  </span>
                </div>
              </div>

              {expandedIndex === index ? (
                <ChevronUp className="mt-1 shrink-0 text-gray-400" />
              ) : (
                <ChevronDown className="mt-1 shrink-0 text-gray-400" />
              )}
            </button>

            {expandedIndex === index && (
              <div className="space-y-4 border-t border-gray-700 p-5">

                <div>
                  <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-violet-400">
                    <MessageSquare size={16} />
                    Why this question?
                  </h4>

                  <p className="text-sm leading-relaxed text-gray-300">
                    {item.reason}
                  </p>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-semibold text-violet-400">
                    What the interviewer evaluates
                  </h4>

                  <p className="text-sm leading-relaxed text-gray-300">
                    {item.evaluation_criteria}
                  </p>
                </div>

              </div>
            )}
          </div>
        ))}
      </div>

    </section>
  );
}

export default InterviewQuestions;
