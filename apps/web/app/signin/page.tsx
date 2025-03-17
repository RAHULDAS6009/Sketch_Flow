"use client";

import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

// TODO:signup with nextAuth provider like google,github,discord
// TODO:cookie based authentication
const Page = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const route=useRouter()

  async function onClick() {
    // TODO:use zod thing into this
    // Basically  validate the thing
    
    try {
    
      const response = await axios.post("http://localhost:5000/signin", {
        username,
        password,
      });
      console.log(response.data.token)
      localStorage.setItem("token", response.data.token);

      route.push("/")
      
    } catch (error) {
      // TODO:pass the error message in the frontend
      console.log(" Here is the error :", error);
      alert(error);
    }
  }
  return (
    <div className="w-screen h-screen flex items-center justify-center  ">
      <div className="flex flex-col w-[50%] gap-2 bg-slate-200 p-6 rounded-md">
        <div className="text-4xl font-bold text-center">Sign in</div>
        <div className="font-semibold"> Username : </div>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border  rounded-md"
          type="text"
        />

        <div className="font-semibold"> Password : </div>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded-md"
          type="text"
        />

        <button
          onClick={onClick}
          className="bg-slate-400 p-2 text-center font-bold hover:bg-slate-500 text-white rounded-md"
        >
          Submit
        </button>

        <a href="/signup">Register</a>
      </div>
    </div>
  );
};

export default Page;
