import { Button } from "@repo/ui/button";
import { Check } from "lucide-react";

export const Pricing = () => {
  return (
    <div className="bg-blue-500 ">
      <div className="max-w-7xl h-full mx-auto py-20 grid grid-cols-1  md:flex items-center md:items-start   gap-5 text-white">
        <div className="flex flex-col gap-4 h-full">
          <h1 className="text-4xl font-extrabold">
            Ready to Start Collaborating?
          </h1>

          <h2 className="text-xl font-normal">
            Join thousands of teams who are already using SketchTogether to
            bring their ideas to life. Free to get started, no credit card
            required.
          </h2>

          <Button
            variant="none"
            className="bg-white text-black max-w-sm mt-8"
            size="medium"
            appName="Start Drawing Now"
          />
        </div>

        <div className="bg-blue-400  backdrop-blur-3xl border border-white rounded-lg p-2 w-full flex flex-col gap-7">
          {[
            "Unlimited canvases with the free plan",
            "Real-time collaboration with up to 5 users",
            "Export your work in multiple formats",
            "Custom templates for different use cases",
          ].map((item, index) => {
            return (
              <div key={index} className="flex gap-5 text-white ">
                <Check />
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
