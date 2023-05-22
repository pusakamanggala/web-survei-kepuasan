import { useMutation } from "react-query";

const useAddStudentToClass = () => {
  const addStudentToClassMutation = useMutation(async (formData) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/insert-mahasiswa`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add students to class");
    }

    return response.json();
  });

  return addStudentToClassMutation;
};

export default useAddStudentToClass;
