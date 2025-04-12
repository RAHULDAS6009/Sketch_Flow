import { Card } from "@repo/ui/card";
import { Square } from "lucide-react";

export const Features = () => {
  return (
    <div className="  bg-violet-100 py-10 ">
      <div className="flex flex-col gap-2 ">
        <span className="text-center text-4xl font-bold">
          Powerful Drawing Tools
        </span>
        <span className="text-center text-xl text-gray-500">
          Everything you need to bring your ideas to life, with tools designed
          for collaboration and creativity.
        </span>
      </div>

      <div className="py-10 grid gap-4 grid-cols-1 md:grid-cols-4 max-w-7xl mx-auto">
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
        />
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
        />
      </div>
    </div>
  );
};
