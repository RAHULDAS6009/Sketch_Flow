"use client";
import { useEffect, useRef, useState } from "react";
import { initDraw } from "../draw";
import { IconComponent } from "./Icon";
import { Circle, Pen, RectangleHorizontal } from "lucide-react";

type Shape = "circle" | "rectangle" | "pencil";
export const Canvas = ({
  roomId,
  socket,
}: {
  roomId: string;
  socket: WebSocket;
}) => {
  const canvasref = useRef<HTMLCanvasElement>(null);
  // TODO : make it shape to enum
  const [selectedTool, setSelectedTool] = useState<Shape>("circle");
  // WORST Way
  // M-1 : localStorage.setItem("tool", selectedTool);
  // M-2
  useEffect(() => {
    // @ts-ignore
    window.selectedTool = selectedTool;
  }, [selectedTool]);

  useEffect(() => {
    if (canvasref.current) {
      initDraw(canvasref.current, roomId, socket);
    }
  }, [canvasref]);

  return (
    <div className="w-screen h-screen ">
      <canvas
        className="cursor-crosshair"
        ref={canvasref}
        width={window.innerWidth}
        height={window.innerHeight}
      ></canvas>
      <TopBar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
    </div>
  );
};

export const TopBar = ({
  selectedTool,
  setSelectedTool,
}: {
  selectedTool: Shape;
  setSelectedTool: (s: Shape) => void;
}) => {
  return (
    <div className="fixed top-5 left-10 flex gap-5">
      <IconComponent
        icon={<Pen />}
        isActivated={selectedTool === "pencil"}
        onClick={() => setSelectedTool("pencil")}
      />
      <IconComponent
        icon={<RectangleHorizontal />}
        isActivated={selectedTool === "rectangle"}
        onClick={() => setSelectedTool("rectangle")}
      />

      <IconComponent
        icon={<Circle />}
        isActivated={selectedTool === "circle"}
        onClick={() => setSelectedTool("circle")}
      />
    </div>
  );
};
