import { Quote, Square } from "lucide-react";
import Hero from "../components/landingPage/Hero";
import NavBar from "../components/landingPage/NavBar";
import { Card } from "@repo/ui/card";
import { Features } from "../components/landingPage/Feature";
import { Working } from "../components/landingPage/Working";
import { Testimonial } from "../components/landingPage/Testimonial";
import { Pricing } from "../components/landingPage/Pricing";

export default function Home() {
  return (
    <div className="">
      <div className="w-full border-b-2  border-gray-200">
        <NavBar />
      </div>
      <div className="w-full">
        <Hero />
        <Features />
        <Working />
        <Testimonial/>
        <Pricing/>  
      </div>
    </div>
  );
}
