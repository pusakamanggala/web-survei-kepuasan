import { useMutation } from "react-query";

function useAddCourse() {
  const addCourseMutation = useMutation((course) =>
    fetch("http://localhost:8000/matkul", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
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
