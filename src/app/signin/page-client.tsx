"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function PageClient() {
  const router = useRouter();
  const [inputs, setInputs] = useState({
    identity: "",
    password: "",
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
    const res = await fetch("/api/v1/auth/signin", {
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
      router.refresh();
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 flex flex-col items-center gap-2"
    >
      <input
        name="identity"
        type="text"
        placeholder="Email or Username"
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
      <button className="btn btn-primary md-ripples">Sign In</button>
    </form>
  );
}
