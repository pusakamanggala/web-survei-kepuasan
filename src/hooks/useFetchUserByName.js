import { useQuery } from "react-query";

const useFetchUserByName = ({ role, keyword, autoFetch = true }) => {
  const fetchUser = async () => {
    // Define async function to fetch user data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/${role}/suggest?query=${keyword}`,
      {
        credentials: "include", // Include credentials in the request
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const data = await response.json();
    return data;
  };
  // Use useQuery hook to fetch and cache user data
  return useQuery(["user", role, keyword], fetchUser, {
    refetchOnWindowFocus: false,
    staleTime: 60000, // 1 minute
    cacheTime: 3600000, // 1 hour
    enabled: autoFetch, // to disable or enable auto fetch
  });
};

export default useFetchUserByName;
