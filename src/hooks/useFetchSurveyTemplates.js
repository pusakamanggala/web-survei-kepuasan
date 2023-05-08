import { useQuery } from "react-query";

const useFetchSurveyTemplate = ({ role, autoFetch = true }) => {
  const fetchSurveyTemplate = async () => {
    // Define async function to fetch templates data
    const response = await fetch(
      `http://localhost:8000/survey-template?role=${role}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch templates data");
    }
    const data = await response.json();
    return data;
  };
  // Use useQuery hook to fetch and cache templates data
  return useQuery(["templates", role], fetchSurveyTemplate, {
    refetchOnWindowFocus: false,
    staleTime: 60000, // 1 minute
    cacheTime: 3600000, // 1 hour
    enabled: autoFetch, // to set auto fetch or not
  });
};

export default useFetchSurveyTemplate;
