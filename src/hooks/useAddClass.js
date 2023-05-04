import { useMutation } from "react-query";

function useAddClass() {
  const addClassMutation = useMutation((kelas) =>
    fetch("http://localhost:8000/kelas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(kelas),
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to add kelas");
      }
      return res.json();
    })
  );

  return addClassMutation;
}

export default useAddClass;
