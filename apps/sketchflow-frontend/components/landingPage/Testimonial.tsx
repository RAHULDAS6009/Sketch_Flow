import { Card } from "@repo/ui/card";
import { Quote } from "lucide-react";

export const Testimonial = () => {
  return (
    <div className="bg-white py-20 flex flex-col gap-10">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-4xl font-extrabold ">What Our Users Say</h1>
        <h2 className="text-xl text-gray-400">
          SketchTogether is trusted by thousands of teams and individuals around
          the world.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:flex gap-5 max-w-7xl mx-auto">
        <Card
          icon={<Quote className="size-20 h-10  fill-violet-300 stroke-0" />}
          type="Testimonial"
          content="SketchTogether has transformed how our design team collaborates remotely. The real-time features are game-changing."
          name="Alex Johnson"
          position="UX Design Lead"
          company="Creative Flow"
        />
        <Card
          icon={<Quote className="size-20 h-10  fill-violet-300 stroke-0" />}
          name="Alex Johnson"
          position="UX Design Lead"
          company="Creative Flow"
          type="Testimonial"
          content="SketchTogether has transformed how our design team collaborates remotely. The real-time features are game-changing."
        />
        <Card
          icon={<Quote className="size-20 h-10  fill-violet-300 stroke-0" />}
          name="Alex Johnson"
          position="UX Design Lead"
          company="Creative Flow"
          type="Testimonial"
          content="SketchTogether has transformed how our design team collaborates remotely. The real-time features are game-changing."
        />
      </div>
    </div>
  );
};
