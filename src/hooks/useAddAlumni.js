import { useMutation } from "react-query";

const useAddAlumni = () => {
  const addAlumniMutation = useMutation(async (formData) => {
    const response = await fetch("http://localhost:8000/alumni", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to add alumni");
    }

    return response.json();
  });

  return addAlumniMutation;
};

export default useAddAlumni;
