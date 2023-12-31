import { useEffect, useState } from "react";
import styles from "../cssModules/UpdateUser.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { getUser } from "../Slices/authSlice";
import { updateUserDetails } from "../Slices/userSlice";

export default function UpdateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();
  const naviagte = useNavigate();
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
  const userProfileInfo = useAppSelector((state) => state.auth.userProfileData);

  useEffect(() => {
    if (basicUserInfo) {
      dispatch(getUser(basicUserInfo.id));
    }
  }, [basicUserInfo]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedDetails = {
        name: name,
        email: email,
      };

      await dispatch(
        updateUserDetails({ userId: basicUserInfo?.id || "", updatedDetails })
      );

      naviagte('/');

      console.log("Details updated successfully!");
    } catch (error) {
      console.error("Error updating details:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.h2}>Edit Details</h2>
        <form className={styles.form}>
          <label className={styles.label} htmlFor="username">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your username"
            className={styles.input}
            defaultValue={userProfileInfo?.name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="password">Email</label>
          <input
            type="email"
            placeholder="Enter your password"
            className={styles.input}
            defaultValue={userProfileInfo?.email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            className={styles.button}
            onClick={handleUpdate}
          >
            Update Details
          </button>
        </form>
        {/* <div className="switch">
          Don't have an account? <a href="#">Register here</a>
        </div> */}
      </div>
    </div>
  );
}
