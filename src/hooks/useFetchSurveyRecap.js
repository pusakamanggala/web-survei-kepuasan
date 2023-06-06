import { useQuery } from "react-query";

const useFetchSurveRecap = ({ role, survey, autoFetch = true }) => {
  const fetchSurveyRecap = async () => {
    // Define async function to fetch survey recap data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/recap/survey?role=${role}&${survey}`,
      {
        credentials: "include", // Include credentials in the request
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch survey recap result data");
    }
    const data = await response.json();
    return data;
  };
  // Use useQuery hook to fetch and cache survey data
  return useQuery(["surveyRecap", role, survey], fetchSurveyRecap, {
    refetchOnWindowFocus: false,
    staleTime: 60000, // 1 minute
    cacheTime: 3600000, // 1 hour
    enabled: autoFetch, // to set auto fetch or not
  });
};

export default useFetchSurveRecap;
