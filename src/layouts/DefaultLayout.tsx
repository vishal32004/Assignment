import { Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
import { Navigate } from "react-router-dom";

const DefaultLayout = () => {
  const basicUserInfo = useAppSelector(
    (state: any) => state.auth.basicUserInfo
  );

  if (basicUserInfo) {
    return <Navigate replace to={"/"} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default DefaultLayout;
