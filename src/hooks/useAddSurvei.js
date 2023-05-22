import { useMutation } from "react-query";

function useAddSurvei() {
  const addSurveiMutation = useMutation((survei) =>
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/survey`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(survei),
      credentials: "include",
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
