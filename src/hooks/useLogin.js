import { useMutation } from "react-query";

function useLogin(role) {
  const LoginMutation = useMutation((data) =>
    fetch(`https://web-survei-api.up.railway.app/login/${role}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to login");
      }

      return res.json();
    })
  );

  return LoginMutation;
}

export default useLogin;
