"use client";

import { useEffect, useRef } from "react";

const Page = () => {
  const canvasref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasref.current) {
      const canvas = canvasref.current;
      const context = canvas.getContext("2d");

      if (!context) return;

      let clicked = false;
      let startX = 0;
      let startY = 0;
      // context?.rect(startX, startY, 0, 0);

      canvasref.current.addEventListener("mousedown", (e) => {
        clicked = true;
        startX = e.clientX;
        startY = e.clientY;
      });

      canvasref.current.addEventListener("mouseup", (e) => {
        clicked = false;
      });

      canvasref.current.addEventListener("mousemove", (e) => {
        if (clicked) {
          const width = e.clientX - startX;
          const height = e.clientY - startY;
          context?.clearRect(0, 0, canvas.width, canvas.height);
          context?.strokeRect(startX, startY, width, height);
        }
      });
    }
  }, [canvasref]);
  return (
    <div className="w-screen h-screen ">
      <canvas className="bg-red-50 " ref={canvasref}></canvas>
    </div>
  );
};

export default Page;
