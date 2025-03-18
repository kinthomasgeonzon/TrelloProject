import Button from "@/app/components/button/Button";
import Input from "@/app/components/input/Input";
import { useLoginUserMutation } from "@/app/store/api/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "@login/schemas/loginSchema";
import styles from "@login/styles/login.module.css";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginUser(data).unwrap();
      console.log("Login Successful:", response);

      const userRole = response.user?.role ?? "MEMBER";
      localStorage.setItem("userRole", userRole);
      localStorage.setItem("token", response.token); 

      router.push(userRole === "ADMIN" ? "/kanban" : "/index");
    } catch (err) {
      console.error("Login Failed:", err);
      alert("Invalid email or password.");
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
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
