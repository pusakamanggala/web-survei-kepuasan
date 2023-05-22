import { useMutation } from "react-query";

const useAddSurveyTemplate = () => {
  const addSurveyTemplateMutation = useMutation(async (formData) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/survey-template`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add survei-template");
    }

    return response.json();
  });

  return addSurveyTemplateMutation;
};

export default useAddSurveyTemplate;
