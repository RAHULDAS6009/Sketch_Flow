import axios from "axios";
import { http_url } from "../app/config";

type Shape =
  | {
      type: "rectangle";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    };

export async function initDraw(
  canvas: HTMLCanvasElement,
  roomId: string,
  socket: WebSocket
) {
  // const selectedTool=localStorage.getItem("tool")
  const context = canvas.getContext("2d");
  const exsistingShapes: Shape[] = await getExsisitingShapes(roomId);

  if (!context) return;

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.type == "chat") {
      const parsedShape = JSON.parse(message.message);
      exsistingShapes.push(parsedShape.shape);
      clearCanavs(exsistingShapes, canvas, context);
    }
  };
  clearCanavs(exsistingShapes, canvas, context);

  let clicked = false;
  let startX = 0;
  let startY = 0;
  // context?.rect(startX, startY, 0, 0);

  canvas.addEventListener("mousedown", (e) => {
    clicked = true;
    startX = e.clientX;
    startY = e.clientY;
  });

  canvas.addEventListener("mouseup", (e) => {
    clicked = false;
    const width = e.clientX - startX;
    const height = e.clientY - startY;
    const radius = Math.max(width, height) / 2;
    const rectangleShape: Shape = {
      type: "rectangle",
      x: startX,
      y: startY,
      width: width,
      height: height,
    };

    const circleShape: Shape = {
      type: "circle",
      centerX: startX + radius,
      centerY: startY + radius,
      radius: radius,
    };
    //@ts-ignore
    const selectedTool = window.selectedTool;

    if (selectedTool === "rectangle") {
      exsistingShapes.push(rectangleShape);
      socket.send(
        JSON.stringify({
          type: "chat",
          message: JSON.stringify({
            shape: rectangleShape,
          }),
          roomId,
        })
      );
    } else if (selectedTool === "circle") {
      exsistingShapes.push(circleShape);
      socket.send(
        JSON.stringify({
          type: "chat",
          message: JSON.stringify({
            shape: circleShape,
          }),
          roomId,
        })
      );
    } else {
    }
  });

  canvas.addEventListener("mousemove", (e) => {
    if (clicked) {
      const width = e.clientX - startX;
      const height = e.clientY - startY;
      clearCanavs(exsistingShapes, canvas, context);
      // @ts-ignore
      const selectedTool = window.selectedTool;
      context.strokeStyle = "rgba(255,255,255)";
      if (selectedTool == "rectangle") {
        context?.strokeRect(startX, startY, width, height);
      } else if (selectedTool == "circle") {
        console.log("hi from circle");
        const radius = Math.max(width, height) / 2;
        context.beginPath();

        context.arc(startX + radius, startY + radius, radius, 0, 2 * Math.PI);
        context.stroke();
      }
    }
  });
}

function clearCanavs(
  exsistingShapes: Shape[],
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D
) {
  context?.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "rgba(0,0,0)";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = "rgba(255, 255, 255)";

  exsistingShapes.map((shape) => {
    if (shape.type == "rectangle") {
      context.strokeRect(shape.x, shape.y, shape.width, shape.height);
    } else if (shape.type == "circle") {
      context.beginPath()
      context.arc(shape.centerX, shape.centerY, shape.radius, 0, 2 * Math.PI);
      context.stroke();
    }
  });
}

async function getExsisitingShapes(roomId: string) {
  const res = await axios.get(`${http_url}/chats/${roomId}`);
  const messages = res.data.chats;

  const shapes = messages.map((x: { message: string }) => {
    return JSON.parse(x.message).shape;
  });

  return shapes;
}
