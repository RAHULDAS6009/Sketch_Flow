"use client"
import { redirect } from "next/navigation";

  export default function Home() {
  return <div className="text-4xl text-green-300">
    <button className="text-2xl  bg-amber-400" onClick={()=>redirect("/signin")} >Log in</button>
    
    Do the landing page from Bolt.new</div>;
}
