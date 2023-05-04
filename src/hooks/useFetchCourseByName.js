import { useQuery } from "react-query";

const useFetchCourseByName = ({ keyword, autoFetch = true }) => {
  const fetchCourse = async () => {
    // Define async function to fetch course data
    const response = await fetch(
      `http://localhost:8000/matkul/suggest?query=${keyword}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch course data");
    }
    const data = await response.json();
    return data;
  };
  // Use useQuery hook to fetch and cache course data
  return useQuery(["course", keyword], fetchCourse, {
    refetchOnWindowFocus: false,
    staleTime: 60000, // 1 minute
    cacheTime: 3600000, // 1 hour
    enabled: autoFetch, // to disable or enable auto fetch
  });
};

export default useFetchCourseByName;
