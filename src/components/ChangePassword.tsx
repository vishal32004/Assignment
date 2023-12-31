import { useEffect, useState } from "react";
import styles from "../cssModules/ChangePassword.module.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { getUser } from "../Slices/authSlice";
import { updatePassword } from "../Slices/userSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type PasswordFormData = {
  password: string;
  confirmPassword: string;
};

const schema = z.object({
  password: z.string().min(6).max(20),
  confirmPassword: z.string().min(6).max(20),
});

export default function UpdateUser() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(schema),
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);

  useEffect(() => {
    if (basicUserInfo) {
      dispatch(getUser(basicUserInfo.id));
    }
  }, [basicUserInfo]);

  const onSubmit = async (data: PasswordFormData) => {
    try {
      if (data.password !== data.confirmPassword) {
        console.error("Passwords do not match!");
        return;
      }

      await dispatch(
        updatePassword({
          userId: basicUserInfo?.id || "",
          password: data.password,
        })
      );

      navigate("/");

      console.log("Password updated successfully!");
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.h2}>Edit Password</h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={styles.label} htmlFor="username">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your Password"
            className={styles.input}
            {...register("password")}
          />
          {errors.password && <span style={{color: 'red'}}>{errors.password.message}</span>}

          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            className={styles.input}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span style={{color: 'red'}}>{errors.confirmPassword.message}</span>
          )}

          <button type="submit" className={styles.button}>
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
