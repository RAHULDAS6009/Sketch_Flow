"use client";
import { Button } from "@repo/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex w-48 gap-5">
        <Button>
          <Link href={"/signin"}>Sign in</Link>
        </Button>
        <Button onClick={() => redirect("/signup")}>Sign up</Button>
      </div>
    </div>
  );
}
