import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import UserDashBoard from './pages/UserDashBoard';
import Login from './pages/Login';
import Register from './pages/Register';
import DefaultLayout from './layouts/DefaultLayout';
import ProtectedLayout from './layouts/ProtectedLayout';
import NotificationBar from './components/NotificationBar';
import UpdateUser from './components/UpdateUser';
import ChangePassword from './components/ChangePassword';
import { Roles } from './constants';
import NotFound from './components/NotFound';
import UserSettings from './pages/UserSettings';

const App: React.FC = () => {
  return (
    <>
      <NotificationBar />
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Route>
        <Route
          element={<ProtectedLayout allowedRoles={[Roles.User, Roles.Admin]} />}
        >
          <Route path="/" element={<UserDashBoard />}></Route>
          <Route path="/updateUser" element={<UpdateUser />} />
          <Route path="/updatePassword" element={<ChangePassword />} />
        </Route>

        <Route element={<ProtectedLayout allowedRoles={[Roles.Admin]} />}>
          <Route path="/user-settings" element={<UserSettings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
