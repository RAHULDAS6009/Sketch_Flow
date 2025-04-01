"use client";
import { useEffect, useRef, useState } from "react";
import { initDraw } from "../draw";
import { IconComponent } from "./Icon";
import { Circle, Pen, RectangleHorizontal } from "lucide-react";
import { Game } from "../draw/Game";

export type Tool = "circle" | "rectangle" | "pencil";
export const Canvas = ({
  roomId,
  socket,
}: {
  roomId: string;
  socket: WebSocket;
}) => {
  const canvasref = useRef<HTMLCanvasElement>(null);
  // TODO : make it shape to enum
  const [selectedTool, setSelectedTool] = useState<Tool>("circle");
  const [shape, setShape] = useState<Game>();
  useEffect(() => {
    shape?.setSelectedTool(selectedTool);
  }, [selectedTool]);

  useEffect(() => {
    if (canvasref.current) {
      const shape = new Game(canvasref.current, roomId, socket);
      setShape(shape);
      return () => {
        shape.destroy();
    }
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
  selectedTool: Tool;
  setSelectedTool: (s: Tool) => void;
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
