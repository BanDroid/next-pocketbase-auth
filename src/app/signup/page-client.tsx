"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function PageClient() {
  const router = useRouter();
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [, setError] = useState("");
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/v1/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    });
    if (!res.ok || res.status != 201) {
      const msg = (await res.json()).message;
      return setError(msg);
    }
    const data = await res.json();
    if (!data.error) {
      return router.refresh();
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 flex flex-col items-center gap-2"
    >
      <input
        name="username"
        type="text"
        placeholder="Username"
        className="input"
        onChange={handleInputChange}
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="input"
        onChange={handleInputChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="input"
        onChange={handleInputChange}
      />
      <input
        name="passwordConfirm"
        type="password"
        placeholder="Confirm Password"
        className="input"
        onChange={handleInputChange}
      />
      <button className="btn btn-primary md-ripples">Sign Up</button>
    </form>
  );
}
