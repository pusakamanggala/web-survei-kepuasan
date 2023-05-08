import { useMutation } from "react-query";

function useAddQuestion() {
  const addQuestionMutation = useMutation((question) =>
    fetch("http://localhost:8000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question),
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to add question");
      }
      return res.json();
    })
  );

  return addQuestionMutation;
}

export default useAddQuestion;
