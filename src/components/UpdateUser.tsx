import styles from "../cssModules/UpdateUser.module.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/reduxHooks";
import { updateUserDetails } from "../Slices/userSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUserData } from "../hooks/useUserData";

type UpdateFormData = {
  name: string;
  email: string;
};

const UpdateSchema = z.object({
  name: z.string().min(6).max(20),
  email: z.string().email(),
});

export default function UpdateUser() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UpdateFormData>({
    resolver: zodResolver(UpdateSchema),
  });
  const dispatch = useAppDispatch();
  const naviagte = useNavigate();
  const { id, name, email } = useUserData();

  const handleUpdate = async (data: UpdateFormData) => {
    try {
      const updatedDetails = {
        name: data.name,
        email: data.email,
      };

      await dispatch(updateUserDetails({ userId: id || "", updatedDetails }));

      naviagte("/");

      console.log("Details updated successfully!");
    } catch (error) {
      console.error("Error updating details:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.h2}>Edit Details</h2>
        <form className={styles.form} onSubmit={handleSubmit(handleUpdate)}>
          <label className={styles.label} htmlFor="username">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your username"
            className={styles.input}
            defaultValue={name}
            {...register("name")}
          />

          {errors.name && (
            <span style={{ color: "red" }}>{errors.name.message}</span>
          )}

          <label htmlFor="password" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your password"
            className={styles.input}
            defaultValue={email}
            {...register("email")}
          />
          {errors.email && (
            <span style={{ color: "red" }}>{errors.email.message}</span>
          )}
          <button type="submit" className={styles.button}>
            Update Details
          </button>
        </form>
      </div>
    </div>
  );
}
