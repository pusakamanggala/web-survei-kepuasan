import { useMutation } from "react-query";

function useUpdateUser({ role, id }) {
  const updateUserMutation = useMutation((data) =>
    fetch(`http://localhost:8000/${role}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to update user");
      }
      return res.json();
    })
  );

  return updateUserMutation;
}

export default useUpdateUser;
