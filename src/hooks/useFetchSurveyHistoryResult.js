import { useQuery } from "react-query";

const useFetchSurveyHistoryResult = ({ role, id, autoFetch = true }) => {
  const fetchSurveyHistoryResult = async () => {
    // Define async function to fetch survey history data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/statistic/survey/${role}?id=${id}`,
      {
        credentials: "include", // Include credentials in the request
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch survey history result data");
    }
    const data = await response.json();
    return data;
  };
  // Use useQuery hook to fetch and cache survey data
  return useQuery(["surveyHistoryResult", role, id], fetchSurveyHistoryResult, {
    refetchOnWindowFocus: false,
    staleTime: 60000, // 1 minute
    cacheTime: 3600000, // 1 hour
    enabled: autoFetch, // to set auto fetch or not
  });
};

export default useFetchSurveyHistoryResult;
