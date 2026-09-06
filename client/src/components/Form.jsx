import { useState } from "react"
import { LoginForm } from "../pages/Login";
import { RegisterForm } from "../pages/Register";

export function Form({ value }) {
  const { user, loading } = value;
  const [form, setForm] = useState("login");

//   if (loading) return <p>Loading...</p>;

  return (
    <>
      {form === "login" ? <LoginForm /> : <RegisterForm />}
    </>
  );
}