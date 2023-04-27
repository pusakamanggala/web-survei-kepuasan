import { useQuery } from "react-query";

const useFetchAlumni = ({ sortBy, orderBy, limit, page, angkatan }) => {
  // Define async function to fetch alumni data
  const fetchAlumni = async () => {
    let url = `http://localhost:8000/alumni?sortBy=${sortBy}&orderBy=${orderBy}&limit=${limit}&page=${page}`;

    if (angkatan !== "") {
      url += `&angkatan=${angkatan}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch alumni data");
    }
    const data = await response.json();
    return data;
  };

  // Use useQuery hook to fetch and cache alumni data
  return useQuery(
    ["alumni", sortBy, orderBy, limit, page, angkatan],
    fetchAlumni,
    {
      refetchOnWindowFocus: false,
      staleTime: 60000, // 1 minute
      cacheTime: 3600000, // 1 hour
    }
  );
};

export default useFetchAlumni;
