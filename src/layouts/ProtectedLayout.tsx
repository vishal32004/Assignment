import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { Navigate } from "react-router-dom";

const ProtectedLayout = () => {
  const basicUserInfo = useAppSelector(
    (state: any) => state.auth.basicUserInfo
  );

  if (!basicUserInfo) {
    return <Navigate replace to={"/login"} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
