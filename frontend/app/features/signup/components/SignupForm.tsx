"use client";

import React from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { useSignup } from "../hooks/useSignup";
import styles from "../styles/signup.module.css";

const SignupForm: React.FC = () => {
  const { register, handleSubmit, errors, onSubmit, loading, success, error } = useSignup();

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupBox}>
        <h2>Signup</h2>

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>Signup successful!</p>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input label="Name" type="text" {...register("name")} errorText={errors.name?.message} />
          <Input label="Email" type="email" {...register("email")} errorText={errors.email?.message} />
          <Input label="Password" type="password" {...register("password")} errorText={errors.password?.message} />

          <Button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
