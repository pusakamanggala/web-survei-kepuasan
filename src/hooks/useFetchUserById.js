import { useQuery } from "react-query";

const useFetchUserById = ({ role, id }) => {
  const fetchUser = async () => {
    // Define async function to fetch user data
    const response = await fetch(`http://localhost:8000/${role}/${id}`);
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
  });
};

export default useFetchUserById;
