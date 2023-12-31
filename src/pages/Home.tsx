import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { getUser } from "../Slices/authSlice";
import styles from "../cssModules/Home.module.css";
import LogOut from "../components/LogOut";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const naviagte = useNavigate();
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
  const userProfileInfo = useAppSelector((state) => state.auth.userProfileData);

  useEffect(() => {
    if (basicUserInfo) {
      dispatch(getUser(basicUserInfo.id));
    }
  }, [basicUserInfo]);

  return (
    <>
      <LogOut />
      <div className={styles.body}>
        <div className={styles.container}>
          <div className={styles.title}>User Information</div>
          <form>
            <div className={styles.user__details}>
              <div className={styles.input__box}>
                <span className={styles.details}>Full Name</span>
                <input
                  type="text"
                  placeholder="E.g: John Smith"
                  required
                  value={userProfileInfo?.name || ""}
                  readOnly
                />
              </div>
              <div className={styles.input__box}>
                <span className={styles.details}>Email</span>
                <input
                  type="email"
                  placeholder="johnsmith@hotmail.com"
                  required
                  value={userProfileInfo?.email || ""}
                  readOnly
                />
              </div>
            </div>
          </form>
          <button
            className={styles.passButtom}
            onClick={() => naviagte("/updatePassword")}
          >
            <i
              className="fa-sharp fa-solid fa-pen-to-square"
              style={{ marginRight: "5px" }}
            ></i>
            Change Password
          </button>
          <button
            className={styles.EditButtom}
            onClick={() => naviagte("/updateUser")}
          >
            <i
              className="fa-sharp fa-solid fa-pen-to-square"
              style={{ marginRight: "5px" }}
            ></i>
            Edit Detais
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
