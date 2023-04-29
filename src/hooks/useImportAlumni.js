import { useMutation } from "react-query";

function useImportAlumni() {
  const importAlumniMutation = useMutation((file) => {
    const formData = new FormData();
    formData.append("file", file);

    return fetch("http://localhost:8000/alumni/bulk", {
      method: "POST",
      body: formData,
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to add alumni");
      }
      return res.json();
    });
  });

  return importAlumniMutation;
}

export default useImportAlumni;
