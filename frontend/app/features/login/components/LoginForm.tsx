"use client";

import Button from "@/app/components/button/Button";
import Input from "@/app/components/input/Input";
import styles from "@login/styles/login.module.css";
import Link from "next/link";
import { useState } from "react";
import { useLoginForm } from "../hooks/useLoginForm";

const LoginForm: React.FC = () => {
  const { register, handleSubmit, errors, onSubmit, isLoading, errorMessage } = useLoginForm();
  const [email, setEmail] = useState("");

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Login</h2>

          <Input
            label="Email"
            {...register("email", {
              onChange: (e) => setEmail(e.target.value),
            })}
            errorText={errors.email?.message}
          />

          <Input
            label="Password"
            type="password"
            {...register("password")}
            errorText={errors.password?.message}
          />

          {errorMessage && <p className={styles.error}>{errorMessage}</p>}

          <Button type="submit" loading={isLoading}>Login</Button>
          
          <div className={styles.forgotPassword}>
            <Link
              href={email.trim() ? `/reset-password?email=${encodeURIComponent(email)}` : "#"}
              className={email.trim() ? styles.activeLink : styles.disabledLink}
              style={{ pointerEvents: email.trim() ? "auto" : "none" }}
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
