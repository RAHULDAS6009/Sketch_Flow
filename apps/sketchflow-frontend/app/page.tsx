import Hero from "../components/landingPage/Hero";
import NavBar from "../components/landingPage/NavBar";

export default function Home() {
  return (
    <div className=" ">
      <div className="w-full border-b-2  border-gray-200">
        <NavBar />
      </div>
      <div className="max-w-7xl mx-auto  p-4 md:p-0">
        <Hero />
      </div>
    </div>
  );
}
