import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DefaultLayout from "./layouts/DefaultLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import NotificationBar from "./components/NotificationBar";
import UpdateUser from "./components/UpdateUser";

function App() {
  return (
    <>
      <NotificationBar />
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Route>
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/updateUser" element={<UpdateUser />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
