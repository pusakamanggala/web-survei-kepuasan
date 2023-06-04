import { useQuery } from "react-query";

const useFetchTotalRecordOfUser = ({ role }) => {
  // Define async function to fetch user record data
  const fetchTotalRecord = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/total-record?entity=${role}`,
      {
        credentials: "include", // Include credentials in the request
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch user record data");
    }
    const data = await response.json();
    return data;
  };

  // Use useQuery hook to fetch and cache record data
  return useQuery(["record", role], fetchTotalRecord, {
    refetchOnWindowFocus: false,
    staleTime: 60000, // 1 minute
    cacheTime: 3600000, // 1 hour
  });
};

export default useFetchTotalRecordOfUser;
