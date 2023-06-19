import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../..";

function Profile() {
  const { userId } = useParams();
  const { state, dispatch } = useContext(AppContext);

  const getUserProfileDetails = async () => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      //   if (jsonResponse.user) {
      //     dispatch({
      //       type: "UPDATE_PROFILE_DETAILS_OBJ",
      //       payload: jsonResponse.user,
      //     });
      //   }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserProfileDetails();
  }, []);

  return <div></div>;
}

export default Profile;
