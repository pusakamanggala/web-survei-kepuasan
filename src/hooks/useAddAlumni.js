import { useMutation } from "react-query";

const useAddAlumni = () => {
  const addAlumniMutation = useMutation(async (formData) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/alumni`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add alumni");
    }

    return response.json();
  });

  return addAlumniMutation;
};

export default useAddAlumni;
