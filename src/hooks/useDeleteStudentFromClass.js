import { useMutation } from "react-query";

const useDeleteStudentFromClass = () => {
  const deleteStudentFromClassMutation = useMutation(
    async ({ classId, nim }) => {
      const response = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/remove-student?classId=${classId}&nim=${nim}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to remove student from class");
      }
      const data = await response.json();
      return data;
    }
  );

  return deleteStudentFromClassMutation;
};

export default useDeleteStudentFromClass;
