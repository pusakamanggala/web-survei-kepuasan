import { useMutation } from "react-query";

function useAddLecturer() {
  const addLecturerMutation = useMutation((lecturer) =>
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/dosen`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lecturer),
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

  return addLecturerMutation;
}

export default useAddLecturer;
