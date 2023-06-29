import { useMutation } from "react-query";

function useAddStudent() {
  const addStudentMutation = useMutation((student) =>
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/mahasiswa`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
      credentials: "include",
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((errorData) => {
          throw new Error(errorData.message); // Throw an Error with the error message
        });
      }
      return res.json();
    })
  );

  return addStudentMutation;
}

export default useAddStudent;
