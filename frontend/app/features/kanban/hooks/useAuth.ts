import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      if (!token) {
        setIsAuthenticated(false);
        document.title = "Login | TaskMan";

        window.history.pushState(null, "", "/login");
        window.history.replaceState(null, "", "/login");

        if (window.location.pathname !== "/login") {
          router.replace("/login");
        }
        return;
      }

      setUserRole(role);
      setIsAuthenticated(true);
      document.title = "Kanban Board | TaskMan";

      if (window.location.pathname === "/login") {
        router.replace("/kanban");
      }
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);

    const handlePopState = () => {
      if (!localStorage.getItem("token")) {
        window.history.pushState(null, "", "/login");
        router.replace("/login");
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);

  return { userRole, isAuthenticated };
};
