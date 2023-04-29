import { useMutation } from "react-query";

function useAddLecturer() {
  const addLecturerMutation = useMutation((lecturer) =>
    fetch("http://localhost:8000/dosen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lecturer),
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to add lecturer");
      }
      return res.json();
    })
  );

  return addLecturerMutation;
}

export default useAddLecturer;
