import { Button } from "@repo/ui/button";
import { Pallete } from "../Palette";
import Link from "next/link";

const links = ["Features", "How it Works", "Testimonials"];

const NavBar = () => {
  return (
    <div className=" flex justify-between items-center  py-4   mx-auto  max-w-7xl ">
      <Pallete /> 

      <div className="flex gap-5 text-sm font-medium  ">
        {links.map((item, index) => {
          return (
            <a href="" className="hidden md:block" key={index}>
              {item}
            </a>
          );
        })}
      </div>

      <div className="flex gap-2  w-[200px]">
        <Button size="small" className=" bg-white" variant="Primary">
          <Link href={"/signin"}>Sign in</Link>
        </Button>
        <Button size="small" variant="Outlined" >
          <Link href={"/signup"}>Sign up</Link>
        </Button>
      </div>

    </div>
  );
};

export default NavBar;
