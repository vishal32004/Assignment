import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { getUser } from "../Slices/authSlice";

export const useUserData = () => {
  const dispatch = useAppDispatch();
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
  
  useEffect(() => {
    if (basicUserInfo) {
      dispatch(getUser(basicUserInfo.id));
    }
  }, [basicUserInfo, dispatch]);
  
  const userProfileInfo = useAppSelector((state) => state.auth.userProfileData);

  return {
    id: basicUserInfo?.id,
    name: userProfileInfo?.name,
    email: userProfileInfo?.email,
    roles: userProfileInfo?.roles
  };
};
