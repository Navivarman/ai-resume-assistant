import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 180000,
});

export const analyzeResume = async (file, jobDescription) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("job_description", jobDescription);

  const response = await api.post(
    "/api/jobs/match",
    formData
  );

  return response.data;
};

export default api;