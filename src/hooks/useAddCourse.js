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
    }).then(async (res) => {
      if (!res.ok) {
        let errorMessage = "Failed to add course";
        const responseJson = await res.json();
        if (responseJson && responseJson.message) {
          errorMessage = responseJson.message;
        }
        throw new Error(errorMessage);
      }
      return res.json();
    })
  );

  return addCourseMutation;
}

export default useAddCourse;
