import { useRef, useState } from "react";
import {
  FileText,
  Upload,
  X,
  Briefcase,
  AlertCircle,
  LoaderCircle,
  CheckCircle2,
} from "lucide-react";

import { analyzeResume } from "../services/api";

import ResultsDashboard from "./ResultsDashboard";

function ResumeAnalyzer() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");

  const [error, setError] = useState("");
  const [apiError, setApiError] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef(null);

  // Validate uploaded PDF
  const validateFile = (file) => {
    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      return false;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be smaller than 5 MB.");
      return false;
    }

    setError("");
    setApiError("");
    setSelectedFile(file);

    return true;
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      validateFile(file);
    }

    event.target.value = "";
  };

  // Handle drag and drop
  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];

    if (file) {
      validateFile(file);
    }
  };

  // Remove selected file
  const removeFile = () => {
    setSelectedFile(null);
    setError("");
    setApiError("");
  };

  // Submit resume and job description
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setApiError("");
    setAnalysisResult(null);

    if (!selectedFile) {
      setError("Please upload your resume.");
      return;
    }

    if (!jobDescription.trim()) {
      setError("Please enter a job description.");
      return;
    }

    try {
      setIsLoading(true);

      const result = await analyzeResume(selectedFile, jobDescription);

      setAnalysisResult(result);

      console.log("AI Analysis Result:", result);
    } catch (error) {
      console.error("API Error:", error);

      if (error.response) {
        setApiError(
          error.response.data?.detail || "Unable to process your resume.",
        );
      } else if (error.code === "ECONNABORTED") {
        setApiError("The request took too long. Please try again.");
      } else {
        setApiError(
          "Unable to connect to the server. Please check your backend.",
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="mx-auto mt-24 max-w-4xl px-6 pb-24">
      {/* Heading */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-white">
          Start Your Career Analysis
        </h2>

        <p className="mt-3 text-gray-400">
          Upload your resume and provide the job description.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Resume Upload */}
        <div>
          <label className="mb-3 block text-sm font-semibold text-gray-200">
            Upload Your Resume (PDF)
          </label>

          {!selectedFile ? (
            <div
              onDragOver={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 transition ${
                isDragging
                  ? "border-violet-400 bg-violet-500/10"
                  : "border-gray-700 bg-gray-900 hover:border-violet-500"
              }`}
            >
              <Upload size={32} className="mb-4 text-violet-400" />

              <p className="font-medium text-white">
                Drag and drop your resume here
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Or click to browse · PDF only · Maximum 5 MB
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          ) : (
            <div className="flex items-center justify-between rounded-lg border border-gray-700 bg-gray-900 p-4">
              <div className="flex items-center gap-3">
                <FileText className="text-violet-400" />

                <div>
                  <p className="text-sm font-medium text-white">
                    {selectedFile.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={removeFile}
                disabled={isLoading}
                className="text-gray-400 hover:text-red-400 disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Job Description */}
        <div>
          <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-200">
            <Briefcase size={18} className="text-violet-400" />
            Job Description
          </label>

          <textarea
            value={jobDescription}
            onChange={(event) => setJobDescription(event.target.value)}
            placeholder="Paste the job description here..."
            rows={8}
            maxLength={15000}
            disabled={isLoading}
            className="w-full resize-y rounded-xl border border-gray-700 bg-gray-900 p-5 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-violet-500 disabled:opacity-60"
          />

          <p className="mt-2 text-right text-xs text-gray-500">
            {jobDescription.length}/15000 characters
          </p>
        </div>

        {/* Frontend Validation Error */}
        {error && (
          <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {/* Backend API Error */}
        {apiError && (
          <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
            <AlertCircle size={18} />
            {apiError}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-violet-600 py-4 font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <LoaderCircle className="animate-spin" size={20} />
              Analyzing Your Resume...
            </>
          ) : (
            "Analyze My Resume"
          )}
        </button>
      </form>
      {analysisResult && <ResultsDashboard result={analysisResult} />}
    </section>
  );
}

export default ResumeAnalyzer;
