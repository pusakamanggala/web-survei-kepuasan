import { useMutation } from "react-query";

function useImportStudentToClass() {
  const importStudentToClassMutation = useMutation((file) => {
    const formData = new FormData();
    formData.append("file", file);

    return fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/insert-mahasiswa/bulk`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    ).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to import student");
      }
      return res.json();
    });
  });

  return importStudentToClassMutation;
}

export default useImportStudentToClass;
