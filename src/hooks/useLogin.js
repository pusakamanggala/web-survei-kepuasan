import { useMutation } from "react-query";

function useLogin(role) {
  const LoginMutation = useMutation((data) =>
    fetch(`https://web-survei-api.up.railway.app/login/${role}`, {
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
      const cookies = res.headers.get("Set-Cookie");
      document.cookie = cookies;

      console.log(cookies);

      return res.json();
    })
  );

  return LoginMutation;
}

export default useLogin;
