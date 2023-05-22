import { useQuery } from "react-query";

const useFetchClassDetails = ({ id }) => {
  const fetchClassDetails = async () => {
    // Define async function to fetch class data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/kelas/${id}`,
      {
        credentials: "include", // Include credentials in the request
      }
    );
    if (response.status === 400) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    } else if (!response.ok) {
      throw new Error("Failed to fetch class data");
    }
    const data = await response.json();
    return data;
  };

  // Use useQuery hook to fetch and cache user data
  return useQuery(["class", id], fetchClassDetails, {
    refetchOnWindowFocus: false,
    staleTime: 60000, // 1 minute
    cacheTime: 3600000, // 1 hour
    retry: false,
  });
};

export default useFetchClassDetails;
