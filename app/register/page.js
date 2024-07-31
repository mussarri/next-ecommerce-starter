"use client";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();

  const { error, registerUser, clearErrors } = useContext(AuthContext);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error]);

  const handleClick = () => {
    if (!name || !email || !password || !passwordCheck) {
      toast.error("All fields required");
      return;
    }
    if (password !== passwordCheck) {
      toast.error("Passwords doesn't match");
      return;
    }

    registerUser({ name, email, password });
  };

  return (
    <div
      className="w-full flex justify-center items-center bg-lightgray"
      style={{ height: "calc(100% - 80px)" }}
    >
      <div className="flex flex-col gap-5  p-6 py-10 rounded w-[400px] border border-[#aaa] shadow bg-white">
        <h2 className="font-bold text-xl">Register</h2>
        <div className="flex flex-col gap-2">
          {" "}
          <div className="flex flex-col gap-1">
            <label className="text-[#444]">Name</label>
            <input
              type="text"
              placeholder="name"
              className="border p-2 rounded border-[#aaa] text-sm text-[#000]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[#444]">Email</label>
            <input
              type="text"
              placeholder="email"
              className="border p-2 rounded border-[#aaa] text-sm text-[#000]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <label className="text-[#444]">Password</label>
            <input
              type="password"
              placeholder="password"
              className="border p-2 rounded border-[#aaa] text-sm text-[#000]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <label className="text-[#444]">Password Check</label>
            <input
              type="password"
              placeholder="password"
              className="border p-2 rounded border-[#aaa] text-sm text-[#000]"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
          </div>
        </div>
        <div className="text-right">
          <button
            className="py-2 px-3 bg-tahiti text-white rounded hover:opacity-80"
            onClick={handleClick}
          >
            Submit
          </button>
        </div>

        <p className="text-center">
          Do you have already an account?{" "}
          <Link href="/login" className="text-midnight hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
