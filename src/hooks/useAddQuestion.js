import { useMutation } from "react-query";

function useAddQuestion() {
  const addQuestionMutation = useMutation((question) =>
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question),
      credentials: "include",
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
