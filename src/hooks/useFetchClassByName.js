import { useQuery } from "react-query";

const useFetchClassByName = ({ keyword, autoFetch = true }) => {
  const fetchClass = async () => {
    // Define async function to fetch class data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/kelas/suggest?query=${keyword}`,
      {
        credentials: "include", // Include credentials in the request
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch class data");
    }
    const data = await response.json();
    return data;
  };
  // Use useQuery hook to fetch and cache class data
  return useQuery(["class", keyword], fetchClass, {
    refetchOnWindowFocus: false,
    staleTime: 60000, // 1 minute
    cacheTime: 3600000, // 1 hour
    enabled: autoFetch,
  });
};

export default useFetchClassByName;
