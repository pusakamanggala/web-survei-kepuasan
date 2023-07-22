import { useMutation } from "react-query";

function useResetUserPassword(role) {
  const resetUserPasswordMutation = useMutation((data) =>
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/hard-reset-password/${role}`, {
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

  return resetUserPasswordMutation;
}

export default useResetUserPassword;
