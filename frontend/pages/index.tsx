import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <section className="section is-fullheight is-flex is-justify-content-center is-align-items-center">
      <div className="container has-text-centered">
        <h1 className="title">TaskMan</h1>
        <p className="subtitle">Manhandle your tasks, the TaskMan way</p>
        <div className="buttons is-centered">
          <button className="button is-primary" onClick={() => router.push("/login")}>
            Login
          </button>
          <button className="button is-link" onClick={() => router.push("/signup")}>
            Sign Up
          </button>
        </div>
      </div>
    </section>
  );
}
