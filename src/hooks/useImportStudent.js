import { useMutation } from "react-query";

function useImportStudent() {
  const importStudentMutation = useMutation((file) => {
    const formData = new FormData();
    formData.append("file", file);

    return fetch("http://localhost:8000/mahasiswa/bulk", {
      method: "POST",
      body: formData,
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to add student");
      }
      return res.json();
    });
  });

  return importStudentMutation;
}

export default useImportStudent;
