import { useMutation } from "react-query";

const useFillSurvey = (role) => {
  const fillSurveyMutation = useMutation(async (data) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/fill-survey/${role}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fill survey");
    }

    return response.json();
  });

  return fillSurveyMutation;
};

export default useFillSurvey;
