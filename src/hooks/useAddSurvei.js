import { useMutation } from "react-query";

function useAddSurvei() {
  const addSurveiMutation = useMutation((survei) =>
    fetch("http://localhost:8000/survey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(survei),
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to add survei");
      }
      return res.json();
    })
  );

  return addSurveiMutation;
}

export default useAddSurvei;
