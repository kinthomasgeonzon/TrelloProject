import { useLoginUserMutation } from "@/app/store/api/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "@login/schemas/loginSchema";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const useLoginForm = () => {
  const router = useRouter();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const { token, user } = await loginUser(data).unwrap();

      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id.toString());
      localStorage.setItem("role", user.role || "MEMBER");

      window.dispatchEvent(new Event("storage"));
      document.title = "Kanban Board | TaskMan";

      router.replace("/kanban");
      window.history.replaceState(null, "", "/kanban");

    } catch (err) {
      console.error("Login Failed:", err);
      setErrorMessage("Invalid email or password.");
    }
  };

  useEffect(() => {
    document.title = "Login | TaskMan";

    if (localStorage.getItem("token")) {
      router.replace("/kanban");
    }
  
    const preventBack = () => {
      window.history.pushState(null, "", window.location.href);
      window.history.replaceState(null, "", window.location.href);
    };
    preventBack();
    window.addEventListener("popstate", preventBack);

    return () => {
      window.removeEventListener("popstate", preventBack);
    };
  }, [router]);

  return { register, handleSubmit, errors, onSubmit, isLoading, errorMessage };
};
