import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { Navigate } from 'react-router-dom';
import AccessDenied from '../components/AccessDenied';
import { logout } from '../Slices/authSlice';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';

type ProtectedLayoutType = {
  allowedRoles: string[];
};

const ProtectedLayout = ({ allowedRoles }: ProtectedLayoutType) => {
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
  const token = useAppSelector((state) => state.auth.basicUserInfo?.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    let timerRef: NodeJS.Timeout | null = null;

    if (token) {
      const decoded = jwtDecode(token);

      if (decoded && typeof decoded.exp === 'number') {
        const expiryTime = new Date(decoded.exp * 1000).getTime();
        const currentTime = new Date().getTime();

        const timeout = expiryTime - currentTime;
        const onExpire = () => {
          dispatch(logout());
          navigate('/login');
        };

        if (timeout > 0) {
          timerRef = setTimeout(onExpire, timeout);
        } else {
          onExpire();
        }
      }
    }
    return () => {
      if (timerRef) clearTimeout(timerRef);
    };
  }, [dispatch, navigate, token]);

  if (!basicUserInfo) {
    return <Navigate replace to={'/login'} />;
  }

  if (
    !basicUserInfo.roles ||
    !basicUserInfo.roles.some((role: string) => allowedRoles.includes(role))
  ) {
    console.log(basicUserInfo, 'test');
    return <AccessDenied />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
