"use client";

import Button from "@/app/components/button/Button";
import Input from "@/app/components/input/Input";
import { useLoginUserMutation } from "@/app/store/api/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "@login/schemas/loginSchema";
import styles from "@login/styles/login.module.css";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [loginUser, { isLoading, error }] = useLoginUserMutation();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginUser(data).unwrap();
      alert("Login successful!");
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  const emailValue = watch("email");

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Login</h2>
          <Input
            label="Email"
            {...register("email")}
            errorText={errors.email?.message}
          />
          <Input
            label="Password"
            type="password"
            {...register("password")}
            errorText={errors.password?.message}
          />
          {error && <p className={styles.error}>Invalid credentials</p>}
          <Button type="submit" loading={isLoading}>
            Login
          </Button>

          <div className={styles.forgotPassword}>
            {emailValue ? (
              <Link href={`/reset-password?email=${emailValue}`}>
                Forgot Password?
              </Link>
            ) : (
              <span className={styles.disabledLink}>Forgot Password?</span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
