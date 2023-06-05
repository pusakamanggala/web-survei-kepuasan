import { useQuery } from "react-query";

const useFetchSurveyList = ({ role, startDate, endDate, autoFetch = true }) => {
  const fetchSurveyList = async () => {
    // Define async function to fetch survey data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/list-survei/${role}?startDate=${startDate}&endDate=${endDate}`,
      {
        credentials: "include", // Include credentials in the request
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch survey list data");
    }
    const data = await response.json();
    return data;
  };
  // Use useQuery hook to fetch and cache survey list data
  return useQuery(["surveyList", role, startDate, endDate], fetchSurveyList, {
    refetchOnWindowFocus: false,
    staleTime: 60000, // 1 minute
    cacheTime: 0, // Disable caching
    enabled: autoFetch, // to set auto fetch or not
  });
};

export default useFetchSurveyList;
