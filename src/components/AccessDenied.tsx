import React from 'react';
import styles from '../cssModules/AccessDenied.module.css';
const AccessDenied: React.FC = () => {
  return (
    <div className={styles.Aothorize}>
      <div className={styles.gandalf}>
        <div className={styles.fireball}></div>
        <div className={styles.skirt}></div>
        <div className={styles.sleeves}></div>
        <div className={styles.shoulders}>
          <div className={`${styles.hand} ${styles.left}`}></div>
          <div className={`${styles.hand} ${styles.right}`}></div>
        </div>
        <div className={styles.head}>
          <div className={styles.hair}></div>
          <div className={styles.beard}></div>
        </div>
      </div>
      <div className={styles.message}>
        <h1>403 - You Shall Not Pass</h1>
        <p>
          Uh oh, Gandalf is blocking the way!
          <br />
          Maybe you have a typo in the url? Or you meant to go to a different
          location? Like...Hobbiton?
        </p>
      </div>
    </div>
  );
};

export default AccessDenied;
