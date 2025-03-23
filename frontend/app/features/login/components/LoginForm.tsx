"use client";

import Button from "@/app/components/button/Button";
import Input from "@/app/components/input/Input";
import styles from "@login/styles/login.module.css";
import Link from "next/link";
import { useLoginForm } from "../hooks/useLoginForm";

const LoginForm: React.FC = () => {
  const { register, handleSubmit, errors, onSubmit, isLoading, errorMessage } = useLoginForm();

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Login</h2>

          <Input label="Email" {...register("email")} errorText={errors.email?.message} />
          <Input label="Password" type="password" {...register("password")} errorText={errors.password?.message} />

          {errorMessage && <p className={styles.error}>{errorMessage}</p>}

          <Button type="submit" loading={isLoading}>Login</Button>

          <div className={styles.forgotPassword}>
            <Link href="/reset-password" className={styles.disabledLink}>
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
