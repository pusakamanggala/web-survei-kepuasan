import { useMutation } from "react-query";

function useLogin({ role }) {
  const updatePasswordMutation = useMutation((data) =>
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/reset-password/${role}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((errorData) => {
          throw new Error(errorData.message); // Throw an Error with the error message
        });
      }

      return res.json();
    })
  );

  return updatePasswordMutation;
}

export default useLogin;
