import { useQuery } from "react-query";

const useFetchLectures = ({
  limit,
  page,
  orderBy,
  sortBy,
  fetchAll = "false",
  stat = "none",
}) => {
  // Define async function to fetch lectures data
  const fetchLectures = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/dosen?limit=${limit}&page=${page}&orderBy=${orderBy}&sortBy=${sortBy}&all=${fetchAll}&status=${stat}`,
      {
        credentials: "include", // Include credentials in the request
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch lecture data");
    }
    const data = await response.json();
    return data;
  };

  // Use useQuery hook to fetch and cache lectures data
  return useQuery(
    ["lectures", limit, page, orderBy, sortBy, fetchAll],
    fetchLectures,
    {
      refetchOnWindowFocus: false,
      staleTime: 60000, // 1 minute
      cacheTime: 3600000, // 1 hour
    }
  );
};

export default useFetchLectures;
