import { useMutation } from "react-query";

function useAddStudent() {
  const addStudentMutation = useMutation((student) =>
    fetch("http://localhost:8000/mahasiswa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to add student");
      }
      return res.json();
    })
  );

  return addStudentMutation;
}

export default useAddStudent;
