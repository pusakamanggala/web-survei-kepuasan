import { useMutation } from "react-query";

function useLogin(role) {
  const LoginMutation = useMutation((data) =>
    fetch(`http://localhost:8000/login/${role}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to login");
      }
      // Save cookies to browser
      const cookies = res.headers.get("set-cookie");
      document.cookie = cookies;
      console.log(document.cookie);

      return res.json();
    })
  );

  return LoginMutation;
}

export default useLogin;
