import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { getUser } from "../Slices/authSlice";
import styles from "../cssModules/Home.module.css";
import LogOut from "../components/LogOut";

const Home = () => {
  const dispatch = useAppDispatch();
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
  const userProfileInfo = useAppSelector((state) => state.auth.userProfileData);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (basicUserInfo) {
      dispatch(getUser(basicUserInfo.id));
    }
  }, [basicUserInfo]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <>
      <LogOut />
      <div className={styles.body}>
        <div className={styles.container}>
          <div className={styles.title}>User Information</div>
          <form action="#">
            <div className={styles.user__details}>
              <div className={styles.input__box}>
                <span className={styles.details}>Full Name</span>
                <input
                  type="text"
                  placeholder="E.g: John Smith"
                  required
                  value={userProfileInfo?.name}
                  disabled={!isEditing}
                />
              </div>
              <div className={styles.input__box}>
                <span className={styles.details}>City</span>
                <input type="text" placeholder="johnWC98" required disabled={!isEditing}/>
              </div>
              <div className={styles.input__box}>
                <span className={styles.details}>Email</span>
                <input
                  type="email"
                  placeholder="johnsmith@hotmail.com"
                  required
                  value={userProfileInfo?.email}
                  disabled={!isEditing}
                />
              </div>
              <div className={styles.input__box}>
                <span className={styles.details}>Phone Number</span>
                <input
                  type="tel"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  placeholder="012-345-6789"
                  required
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className={styles.button}>
              {!isEditing ? ( // Toggle between Edit and Save buttons
                <input
                  type="button"
                  value="Edit Details"
                  onClick={handleEditClick}
                />
              ) : (
                <input type="submit" value="Save Details" />
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
