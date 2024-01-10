import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { getUser } from '../Slices/authSlice';
interface UserData {
  id?: string;
  name?: string;
  email?: string;
  roles?: string[]; // Adjust the type according to what 'roles' contains
}


export const useUserData: () => UserData = () => {
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
  } as UserData;
};
