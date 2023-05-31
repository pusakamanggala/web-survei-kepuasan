import { useQuery } from "react-query";

const useFetchSurveyHistory = ({ role, id, autoFetch = true }) => {
  const fetchSurveyHistory = async () => {
    // Define async function to fetch survey history data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/history/survey/${role}?id=${id}`,
      {
        credentials: "include", // Include credentials in the request
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch survey history data");
    }
    const data = await response.json();
    return data;
  };
  // Use useQuery hook to fetch and cache survey data
  return useQuery(["surveyHistory", role, id], fetchSurveyHistory, {
    refetchOnWindowFocus: false,
    staleTime: 60000, // 1 minute
    cacheTime: 3600000, // 1 hour
    enabled: autoFetch, // to set auto fetch or not
  });
};

export default useFetchSurveyHistory;
