"use client";

import { useRouter } from "next/navigation";
import styles from "../styles/notFound.module.css";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className={styles.notFoundContainer}>
      <h1 className="title is-3">404 - Page Not Found</h1>
      <p className="subtitle is-5">Oops! The page you are looking for does not exist.</p>
      
      <button className="button is-primary" onClick={() => router.push("/")}>
        Go Home
      </button>
    </div>
  );
};

export default NotFoundPage;
