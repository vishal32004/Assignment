import React from 'react';
import { useState } from 'react';
import styles from '../cssModules/ChangePassword.module.css';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/reduxHooks';
import { updatePassword } from '../Slices/userSlice';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useUserData } from '../hooks/useUserData';

type PasswordFormData = {
  password: string;
  confirmPassword: string;
};

const schema = z
  .object({
    password: z.string().min(6).max(20),
    confirmPassword: z.string().min(6).max(20),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password Must Match',
    path: ['confirmPassword'],
  });

 const UpdateUser: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(schema),
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useUserData();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: PasswordFormData) => {
    try {
      if (data.password !== data.confirmPassword) {
        console.error('Passwords do not match!');
        return;
      }
      await dispatch(
        updatePassword({
          userId: id || '',
          password: data.password,
        })
      );
      navigate('/');
    } catch (error) {
      console.error(error)
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((el) => !el);
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
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your Password"
            className={styles.input}
            {...register('password')}
          />

          <button
            type="button"
            onClick={togglePasswordVisibility}
            style={{
              position: 'absolute',
              right: '20px',
              top: '2.8rem',
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.password && (
            <span style={{ color: 'red' }}>{errors.password.message}</span>
          )}

          <label htmlFor="password" className={styles.label}>
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm your password"
            className={styles.input}
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <span style={{ color: 'red' }}>
              {errors.confirmPassword.message}
            </span>
          )}

          <button type="submit" className={styles.button}>
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser
