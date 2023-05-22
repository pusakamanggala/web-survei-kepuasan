import { useQuery } from "react-query";

const useFetchUserById = ({ role, id, autoFetch = true }) => {
  const fetchUser = async () => {
    // Define async function to fetch user data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/${role}/${id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const data = await response.json();
    return data;
  };
  // Use useQuery hook to fetch and cache user data
  return useQuery(["user", role, id], fetchUser, {
    refetchOnWindowFocus: false,
    staleTime: 60000, // 1 minute
    cacheTime: 3600000, // 1 hour
    enabled: autoFetch,
  });
};

export default useFetchUserById;
