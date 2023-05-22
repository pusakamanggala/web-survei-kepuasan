import { useQuery } from "react-query";

const useFetchQuestionByName = ({ keyword, autoFetch = true }) => {
  const fetchQuestion = async () => {
    // Define async function to fetch question data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/question/suggest?query=${keyword}`,
      {
        credentials: "include", // Include credentials in the request
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch question data");
    }
    const data = await response.json();
    return data;
  };
  // Use useQuery hook to fetch and cache question data
  return useQuery(["question", keyword], fetchQuestion, {
    refetchOnWindowFocus: false,
    staleTime: 60000, // 1 minute
    cacheTime: 3600000, // 1 hour
    enabled: autoFetch, // to set auto fetch or not
  });
};

export default useFetchQuestionByName;
