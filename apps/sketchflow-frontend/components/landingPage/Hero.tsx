import { Button } from "@repo/ui/button";
import Image from "next/image";
import heroImage from "../../public/heroImage.png";

const Hero = () => {
  return (
    <div className="w-full  grid grid-cols-1 md:grid-cols-2 gap-5 pt-10 items-center ">
      <div className=" md:col-span-1  flex flex-col gap-6 ">
        <div className="text-4xl md:text-6xl font-bold ">
          <div>
            <span className="text-blue-400">Collaborate</span> and
            <span className="text-violet-500">Create</span>
          </div>
          Together in Real-Time
        </div>

        <div className=" font-normal text-gray-400  md:text-[18px]">
          <div>
            SketchTogether lets you draw, diagram, and collaborate with your
            team on
          </div>
          <div>
            a virtual whiteboard. Simple, powerful, and free to get started.
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:max-w-xs gap-2">
          <Button
            className="md:col-span-1 "
            variant="Primary"
            appName="Start Drawing now"
          />

          <Button
            className="md:col-span-1 border-2 border-gray-200"
            variant="none"
            appName="See How it Works"
          />
        </div>
      </div>

      <div className=" md:col-span-1 ">
        <Image
          className="border border-gray-200 shadow-lg rounded-lg"
          src={heroImage}
          alt="hero image"
        />
      </div>
    </div>
  );
};

export default Hero;
