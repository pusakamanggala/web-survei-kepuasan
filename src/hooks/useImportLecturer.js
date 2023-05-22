import { useMutation } from "react-query";

function useImportLecturer() {
  const importStudentMutation = useMutation((file) => {
    const formData = new FormData();
    formData.append("file", file);

    return fetch(`${process.env.REACT_APP_API_ENDPOINT}/dosen/bulk`, {
      method: "POST",
      body: formData,
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to add lecturer");
      }
      return res.json();
    });
  });

  return importStudentMutation;
}

export default useImportLecturer;
