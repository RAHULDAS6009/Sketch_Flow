"use client";
import { useState } from "react";
import { Pallete } from "./Palette";
import { Input } from "@repo/ui/input";
import { Lock, Mail, User } from "lucide-react";
import { Button } from "@repo/ui/button";
import Link from "next/link";
// import { useAuth } from "../app/hooks/useAuth";
import axios from "axios";
import { http_url } from "../app/config";

import { createUserSchema } from "@repo/common/types";
interface AuthLayoutProps {
  isSignin: boolean;
}
function AuthLayout({ isSignin }: AuthLayoutProps) {
  const [fullname, setFullName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  async function onClick() {
    try {
      const userSchema = createUserSchema.safeParse({
        username,
        password,
        name: fullname,
      });

      if (!userSchema.success) {
        alert("user not verified");
        return;
      }
      async function callApi() {
        const response = await axios.post(`${http_url}/signup`, {
          username,
          password,
          name: fullname,
        });

        response;
      }
      const user = await callApi();
      console.log(user);
      return {
        user,
      };
    } catch (error) {}
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-violet-100 ">
      <form
        className="w-2/7 flex flex-col gap-5 bg-white   rounded-md drop-shadow-2xl p-4"
        action=""
      >
        <div className="flex flex-col gap-5 ">
          <Pallete />
          <div className="font-semibold text-slate-500 w-full text-center">
            Welcome to Sketchflow
          </div>
          {!isSignin && (
            <Input
              label="Full Name"
              type="text"
              Icon={User}
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
            />
          )}
          <Input
            label="Email"
            type="text"
            Icon={Mail}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            Icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={onClick}>
            {isSignin ? "Sign in  " : "Create an account"}
          </Button>
          <span className="w-full text-center">
            {isSignin ? "Already have an account " : "Don't have an account"} ?{" "}
            <Link
              className="text-primary"
              href={`${isSignin ? "/signup" : "/signin"}`}
            >
              {isSignin ? "Sign up" : "Sign in"}
            </Link>{" "}
          </span>
        </div>
      </form>
    </div>
  );
}

export default AuthLayout;
