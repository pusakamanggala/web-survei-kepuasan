import { useMutation } from "react-query";

function useAddCourse() {
  const addCourseMutation = useMutation((course) =>
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/matkul`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
      credentials: "include",
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to add course");
      }
      return res.json();
    })
  );

  return addCourseMutation;
}

export default useAddCourse;
