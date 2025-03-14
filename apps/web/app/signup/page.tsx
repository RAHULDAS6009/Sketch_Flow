"use client";

import axios, { AxiosError, isAxiosError } from "axios";
import { redirect } from "next/navigation";
import { useState } from "react";

// TODO:signup with nextAuth provider like google,github,discord
// TODO:cookie based authentication
const Page = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  async function onClick() {
    // TODO:use zod thing into this
    // Basically  validate the thing
    try {
      const response = await axios.post("http://localhost:5000/signup", {
        username,
        password,
        name,
      });
      alert(response.data.message);
      redirect("/signin");
    } catch (error) {
      // TODO:pass the error message in the frontend
      console.log(" Here is the error :", error);
      alert(error);
    }
  }
  return (
    <div className="w-screen h-screen flex items-center justify-center  ">
      <div className="flex flex-col w-[50%] gap-2 bg-slate-200 p-6 rounded-md">
        <div className="text-4xl font-bold text-center">Sign up</div>
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

        <div className="font-semibold"> Name : </div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded-md"
          type="text"
        />

        <button
          onClick={onClick}
          className="bg-slate-400 p-2 text-center font-bold hover:bg-slate-500 text-white rounded-md"
        >
          Submit
        </button>

        <a className="" href="/signin">
          Log in
        </a>
      </div>
    </div>
  );
};

export default Page;
