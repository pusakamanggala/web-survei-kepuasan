import { useMutation } from "react-query";

function useLogin(role) {
  const LoginMutation = useMutation((data) =>
    fetch(`http://localhost:8000/login/${role}`, {
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

  return LoginMutation;
}

export default useLogin;
