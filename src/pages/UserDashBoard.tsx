import React from 'react';
import styles from '../cssModules/Home.module.css';
import LogOut from '../components/LogOut';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../hooks/useUserData';

const UserDashBoard: React.FC = () => {
  const naviagte = useNavigate();
  const { name, email,roles } = useUserData();
  const isAdmin = roles && roles.includes('ADMIN')
  return (
    <>
      <LogOut />
      {isAdmin && <button
        style={{
          position: 'absolute',
          float: 'right',
          right: '10px',
          top: '8px',
          background: '#1976d2',
          padding: '5px 15px',
          borderRadius: '4rem',
          color: '#fff',
        }}
        onClick={() => naviagte('/user-settings')}
      >
        View Users
      </button>}
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
                  value={name || ''}
                  readOnly
                />
              </div>
              <div className={styles.input__box}>
                <span className={styles.details}>Email</span>
                <input
                  type="email"
                  placeholder="johnsmith@hotmail.com"
                  required
                  value={email || ''}
                  readOnly
                />
              </div>
            </div>
          </form>
          <div
            style={{
              display: 'flex',
              gap: '4rem',
              textAlign: 'center',
              justifyContent: 'space-between',
            }}
          >
            <button
              className={styles.passButtom}
              onClick={() => naviagte('/updatePassword')}
            >
              <i
                className="fa-sharp fa-solid fa-pen-to-square"
                style={{ marginRight: '5px' }}
              ></i>
              Change Password
            </button>
            <button
              className={styles.EditButtom}
              onClick={() => naviagte('/updateUser')}
            >
              <i
                className="fa-sharp fa-solid fa-pen-to-square"
                style={{ marginRight: '5px' }}
              ></i>
              Edit Details
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashBoard;
