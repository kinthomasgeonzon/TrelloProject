"use client";

import Button from "@components/button/Button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "../styles/LogoutButton.module.css";

const LogoutButton: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");

    window.dispatchEvent(new Event("storage"));
    window.history.replaceState(null, "", "/login");

    router.push("/login");
  };

  useEffect(() => {
    const preventBackNavigation = () => {
      router.replace("/login");
    };

    window.history.pushState(null, "", "/login");
    window.history.replaceState(null, "", "/login");

    window.addEventListener("popstate", preventBackNavigation);
    return () => window.removeEventListener("popstate", preventBackNavigation);
  }, [router]);

  return (
    <div className={styles.logoutButton}>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default LogoutButton;
