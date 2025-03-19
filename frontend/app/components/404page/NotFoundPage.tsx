"use client";

import { useRouter } from "next/navigation";
import styles from "./notFound.module.css";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className={styles.notFoundContainer}>
      <h1 className="title is-3">404!</h1>
      <p className="subtitle is-5">Oops! We dont know what happened...</p>
      
      <button className="button is-primary" onClick={() => router.push("/")}>
        Go Home
      </button>
    </div>
  );
};

export default NotFoundPage;
