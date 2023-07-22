import { useQuery } from "react-query";

const useFetchNumberOfUserByEntryYear = () => {
  // Define async function to fetch number of user by entry year data
  const fetchNumberOfUserByEntryYear = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/students/entry-year`,
      {
        credentials: "include", // Include credentials in the request
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch number of user by entry year data");
    }
    const data = await response.json();
    return data;
  };

  // Use useQuery hook to fetch and cache data
  return useQuery(["data"], fetchNumberOfUserByEntryYear, {
    refetchOnWindowFocus: false,
    staleTime: 60000, // 1 minute
    cacheTime: 3600000, // 1 hour
  });
};

export default useFetchNumberOfUserByEntryYear;
