import { useQuery } from "react-query";

const useFetchClasses = ({ limit, page }) => {
  // Define async function to fetch courses data
  const fetchClasses = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/kelas?limit=${limit}&page=${page}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch classes data");
    }
    const data = await response.json();
    return data;
  };

  // Use useQuery hook to fetch and cache classes data
  return useQuery(["classes", limit, page], fetchClasses, {
    refetchOnWindowFocus: false,
    staleTime: 60000, // 1 minute
    cacheTime: 3600000, // 1 hour
  });
};

export default useFetchClasses;
