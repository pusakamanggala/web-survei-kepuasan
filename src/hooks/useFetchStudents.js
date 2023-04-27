import { useQuery } from "react-query";

const useFetchStudents = ({ sortBy, orderBy, limit, page, angkatan }) => {
  const fetchStudents = async () => {
    let url = `http://localhost:8000/mahasiswa?sortBy=${sortBy}&orderBy=${orderBy}&limit=${limit}&page=${page}`;

    if (angkatan !== "") {
      url += `&angkatan=${angkatan}`;
    }
    // Define async function to fetch students data
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch student data");
    }
    const data = await response.json();
    return data;
  };
  // Use useQuery hook to fetch and cache students data
  return useQuery(
    ["students", sortBy, orderBy, limit, page, angkatan],
    fetchStudents,
    {
      refetchOnWindowFocus: false,
      staleTime: 60000, // 1 minute
      cacheTime: 3600000, // 1 hour
    }
  );
};

export default useFetchStudents;
