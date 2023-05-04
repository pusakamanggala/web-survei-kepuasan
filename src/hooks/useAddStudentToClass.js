import { useMutation } from "react-query";

const useAddStudentToClass = () => {
  const addStudentToClassMutation = useMutation(async (formData) => {
    const response = await fetch("http://localhost:8000/insert-mahasiswa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to add students to class");
    }

    return response.json();
  });

  return addStudentToClassMutation;
};

export default useAddStudentToClass;
