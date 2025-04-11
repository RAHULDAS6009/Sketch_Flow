import { Quote, Square } from "lucide-react";
import Hero from "../components/landingPage/Hero";
import NavBar from "../components/landingPage/NavBar";
import { Card } from "@repo/ui/card";

export default function Home() {
  return (
    <div className="w-screen h-screen flex items-center justify-center gap-5">
      {/* <div className="w-full border-b-2  border-gray-200">
        <NavBar />
      </div>
      <div className="max-w-7xl mx-auto  p-4 md:p-0">
        <Hero />
      </div> */}
      {/* <div className="flex gap-5 mx-10">
        <Card
          type="Testimonial"
          icon={<Quote className="size-20 h-10  fill-violet-300 stroke-0" />}
          content="SketchTogether has transformed how our design team collaborates remotely. The real-time features are game-changing."
          name="Alex Johnson"
          position="UX Design Lead"
          company="CreativeFlow"
        />
        <Card
          type="Testimonial"
          icon={<Quote className="size-20 h-10  fill-violet-300 stroke-0" />}
          content="SketchTogether has transformed how our design team collaborates remotely. The real-time features are game-changing."
          name="Alex Johnson"
          position="UX Design Lead"
          company="CreativeFlow"
        />
        <Card
          type="Testimonial"
          icon={<Quote />}
          content="SketchTogether has transformed how our design team collaborates remotely. The real-time features are game-changing."
          name="Alex Johnson"
          position="UX Design Lead"
          company="CreativeFlow"
        />
      </div> */}
      <Card
        type="Feature"
        icon={<Square className="stroke-blue-500 size-12" />}
        content="Create rectangles, circles, arrows and more with our intuitive shape tools."
        heading="Draw Shapes"
      />
      <Card
        type="Feature"
        icon={<Square className="stroke-blue-500 size-12" />}
        content="Create rectangles, circles, arrows and more with our intuitive shape tools."
        heading="Draw Shapes"
      />{" "}
      <Card
        type="Feature"
        icon={<Square className="stroke-blue-500 size-12" />}
        content="Create rectangles, circles, arrows and more with our intuitive shape tools."
        heading="Draw Shapes"
      />{" "}
      <Card
        type="Feature"
        icon={<Square className="stroke-blue-500 size-12" />}
        content="Create rectangles, circles, arrows and more with our intuitive shape tools."
        heading="Draw Shapes"
      />
      {/* <Card type="Working" number={1} content="Start with a blank canvas or choose from our templates to kickstart your project." heading="Create a Canvas" />
      <Card type="Working" number={2} content="Start with a blank canvas or choose from our templates to kickstart your project." heading="Create a Canvas" />
      <Card type="Working" number={3} content="Start with a blank canvas or choose from our templates to kickstart your project." heading="Create a Canvas" /> */}
    </div>
  );
}
