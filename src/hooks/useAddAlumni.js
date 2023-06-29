import { useMutation } from "react-query";

const useAddAlumni = () => {
  const addAlumniMutation = useMutation((formData) =>
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/alumni`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
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

  return addAlumniMutation;
};

export default useAddAlumni;
