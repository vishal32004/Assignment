import styles from "../cssModules/LogOut.module.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logout } from "../Slices/authSlice";
import { useAppDispatch } from "../hooks/reduxHooks";

export default function LogOut() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate("/login");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className={styles.container}>
      <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
