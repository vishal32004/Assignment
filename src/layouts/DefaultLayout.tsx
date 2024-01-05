import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxHooks';
import {jwtDecode} from 'jwt-decode';

const DefaultLayout = () => {
  const navigate = useNavigate();
  const basicUserInfo = useAppSelector((state: any) => state.auth.basicUserInfo);
  const token = basicUserInfo?.token; // Assuming token is stored in basicUserInfo

  useEffect(() => {
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;
  
      decodedToken.exp = currentTime - 60;
  
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        navigate('/login', { replace: true });
      }
    }
  }, [token, navigate]);

  if (!basicUserInfo) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default DefaultLayout;
