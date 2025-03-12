"use client";

import Button from "@components/button/Button";
import Input from "@components/input/Input";
import useResetPassword from "@password-reset/hooks/useResetPassword";
import styles from "../styles/resetPassword.module.css";

const ResetPasswordForm = () => {
  const { register, handleSubmit, errors, resetPassword, loading, message } =
    useResetPassword();

  return (
    <div className={styles.resetPasswordContainer}>
      <div className={styles.resetPasswordBox}>
        <h2 className="title is-4">Reset Password</h2>

        {message && <p className="notification">{message}</p>}

        <form onSubmit={handleSubmit(resetPassword)}>
          {/* Email Input */}
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            errorText={errors.email?.message}
            disabled={loading}
          />

          {/* Submit Button */}
          <Button type="submit" loading={loading}>
            Send Reset Link
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
