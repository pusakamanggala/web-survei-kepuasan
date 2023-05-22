import React, { useContext } from "react";
import useFetchUserById from "../hooks/useFetchUserById";
import { UserContext } from "../context/UserContext";

const MyProfile = () => {
  const { userId, userRole } = useContext(UserContext);

  const { data: userData, isSuccess: isUserDataSuccess } = useFetchUserById({
    role: userRole,
    id: userId,
  });

  return (
    <div>
      {/* map userData */}
      {isUserDataSuccess && <h1>{userData.data.nama}</h1>}
    </div>
  );
};

export default MyProfile;
