"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { parseCallbackUrl } from "../../helpers";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const params = useSearchParams();
  const callBackUrl = params.get("callbackUrl");

  const handleClick = async (e) => {
    const data = await signIn("credentials", {
      email,
      password,
      callbackUrl: callBackUrl ? parseCallbackUrl(callBackUrl) : "/",
    });

    if (data?.error) {
      toast.error(data?.error);
    }

    if (data?.ok) {
      router.push("/");
    }
  };

  return (
    <div
      className="w-full flex justify-center items-center bg-lightgray"
      style={{ height: "calc(100% - 80px)" }}
    >
      <div className="flex flex-col gap-5  p-6 py-10 rounded w-[400px] border border-[#aaa] shadow bg-white">
        <h2 className="font-bold text-xl">Login</h2>
        <div>
          {" "}
          <div className="flex flex-col gap-1">
            <label>Email</label>
            <input
              type="text"
              placeholder="email"
              className="border p-2 rounded border-[#aaa] text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <label>Password</label>
            <input
              type="password"
              placeholder="password"
              className="border p-2 rounded border-[#aaa] text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          Don't have an account?{" "}
          <Link href="/register" className="text-midnight hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
