import { useQuery } from "react-query";

const useFetchSurvey = ({ role, id, autoFetch = true }) => {
  const fetchSurvey = async () => {
    // Define async function to fetch survey data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/survey?role=${role}&id=${id}`,
      {
        credentials: "include", // Include credentials in the request
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch survey data");
    }
    const data = await response.json();
    return data;
  };
  // Use useQuery hook to fetch and cache survey data
  return useQuery(["survey", role, id], fetchSurvey, {
    refetchOnWindowFocus: false,
    staleTime: 60000, // 1 minute
    cacheTime: 0, // Disable caching
    enabled: autoFetch, // to set auto fetch or not
  });
};

export default useFetchSurvey;
