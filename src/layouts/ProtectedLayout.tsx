import { Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
import { Navigate } from "react-router-dom";
import AccessDenied from "../components/AccessDenied";

type ProtectedLayoutType = {
  allowedRoles: string[];
};

const ProtectedLayout = ({ allowedRoles }: ProtectedLayoutType) => {
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);

  if (!basicUserInfo) {
    return <Navigate replace to={"/login"} />;
  }

  if (
    !basicUserInfo.roles ||
    !basicUserInfo.roles.some((role: string) => allowedRoles.includes(role)) 
  ) {
    console.log(basicUserInfo,'test')
    return <AccessDenied />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
