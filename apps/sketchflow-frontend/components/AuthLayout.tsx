"use client";
import { Input } from "@repo/ui/input";
import { useState } from "react";
function AuthLayout({ isSignin }: { isSignin: boolean }) {
  const [username, setUserName] = useState<string>("");
  // TODO:validation check using zod 
  //do the form that i have done in multi step form
  return (
    <div className="">
      Signin
      <Input
        title="Full Name"
        onChange={(e) => setUserName(e.target.value)}
        value={username}
      />
    </div>
  );
}

export default AuthLayout;
