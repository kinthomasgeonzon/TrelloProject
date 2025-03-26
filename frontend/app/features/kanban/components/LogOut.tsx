"use client";

import Button from "@components/button/Button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LogoutButton: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event("storage"));
    router.replace("/login");
  };

  useEffect(() => {
    const preventBackNavigation = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", preventBackNavigation);

    return () => {
      window.removeEventListener("popstate", preventBackNavigation);
    };
  }, []);

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default LogoutButton;
