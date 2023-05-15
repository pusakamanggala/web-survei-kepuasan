import { useQuery } from "react-query";

const useFetchClassByName = ({ keyword, autoFetch = true }) => {
  const fetchClass = async () => {
    // Define async function to fetch class data
    const response = await fetch(
      `http://localhost:8000/kelas/suggest?query=${keyword}`
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
