"use client";

import useResetPasswordRequest from "@/app/features/password-reset/hooks/useResetPasswordRequest";
import Button from "@components/button/Button";
import Input from "@components/input/Input";
import styles from "../styles/resetPassword.module.css";

const ResetPasswordForm = () => {
  const { register, handleSubmit, errors, resetPasswordRequest, loading, message } =
    useResetPasswordRequest();

  return (
    <div className={styles.resetPasswordContainer}>
      <div className={styles.resetPasswordBox}>
        <h2 className="title is-4">Reset Password</h2>

        {message && (
          <p className={`notification ${errors.email ? "is-danger" : "is-success"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit(resetPasswordRequest)}>
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            errorText={errors.email?.message}
            disabled={loading}
          />

          <Button type="submit" loading={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
