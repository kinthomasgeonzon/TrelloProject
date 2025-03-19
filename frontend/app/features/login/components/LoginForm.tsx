"use client";
import Button from "@/app/components/button/Button";
import Input from "@/app/components/input/Input";
import { useLoginUserMutation } from "@/app/store/api/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "@login/schemas/loginSchema";
import styles from "@login/styles/login.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter(); 
  const emailValue = watch("email");

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginUser(data).unwrap();
      localStorage.setItem("userRole", response.user?.role ?? "MEMBER");
      localStorage.setItem("token", response.token);

      router.push("/kanban");
    } catch (err: any) {
      if (err?.status === 404) {
        router.replace("/404");
      } else {
        console.error("Login failed", err);
        alert("Invalid email or password.");
      }
    }
  };

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
          <Button type="submit" loading={isLoading}>
            Login
          </Button>
          {error && <p className={styles.error}>Invalid credentials</p>}
          <div className={styles.forgotPassword}>
            {emailValue ? (
              <Link href="/reset-password">Forgot Password?</Link>
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
