import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";

export const Working = () => {
  return (
    <div className="bg-violet-50 flex flex-col gap-10 py-20">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-4xl font-extrabold ">How Sketch Together Works</h1>
        <h2 className="text-xl text-gray-400">
          Get started in seconds with our simple and intuitive collaborative
          drawing platform.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:flex gap-10 max-w-7xl mx-auto">
        <Card
          type="Working"
          number={1}
          heading="Create a Canvas"
          content="Start with a blank canvas or choose from our templates to kickstart your project."
        />
        <Card
          type="Working"
          number={1}
          heading="Create a Canvas"
          content="Start with a blank canvas or choose from our templates to kickstart your project."
        />
        <Card
          type="Working"
          number={1}
          heading="Create a Canvas"
          content="Start with a blank canvas or choose from our templates to kickstart your project."
        />
      </div>

      <Button size="medium" variant="Primary" className="max-w-[150px]  cursor-pointer mx-auto" appName="Start Drawing now" />
    </div>
  );
};
