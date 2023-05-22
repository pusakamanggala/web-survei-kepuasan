import { useMutation } from "react-query";

function useAddStudent() {
  const addStudentMutation = useMutation((student) =>
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/mahasiswa`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
      credentials: "include",
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
