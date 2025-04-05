import { Shape } from "./index";
import { Tool } from "../components/Canvas";
import { getExsisitingShapes } from "./http";

export class Game {
  private roomId: string;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private startX: number = 0;
  private startY: number = 0;
  private selectedTool: Tool = "circle";
  private clicked: boolean;
  private existingShapes: Shape[];

  socket: WebSocket;

  constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d")!; //assume it is not null
    this.existingShapes = [];
    this.roomId = roomId;
    this.socket = socket;
    this.clicked = false;
    this.init();
    this.initHandlers();
    this.initMouseHandlers();
  }

  destroy() {
    this.canvas.removeEventListener("mousedown", this.mouseDownHandler);

    this.canvas.removeEventListener("mouseup", this.mouseUpHandler);

    this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
  }

  setTool(tool: Tool) {
    this.selectedTool = tool;
  }

  async init() {
    this.existingShapes = await getExsisitingShapes(this.roomId);
    console.log(this.existingShapes);
    this.clearCanvas();
  }

  initHandlers() {
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type == "chat") {
        const parsedShape = JSON.parse(message.message);
        this.existingShapes.push(parsedShape.shape);
        this.clearCanvas();
      }
    };
  }

  initMouseHandlers() {
    this.canvas.addEventListener("mousedown", this.mouseDownHandler);

    this.canvas.addEventListener("mouseup", this.mouseUpHandler);

    this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
  }

  mouseDownHandler = (e: MouseEvent) => {
    console.log("mouse down");
    console.log(this.context);

    this.clicked = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
  };

  mouseUpHandler = (e: MouseEvent) => {
    console.log("mouse up");
    console.log(this.context);
    console.log(this.clicked);

    this.clicked = false;
    const width = e.clientX - this.startX;
    const height = e.clientY - this.startY;
    // const radius = Math.max(width, height) / 2;
    let shape: Shape | null = null;

    if (this.selectedTool === "rectangle") {
      shape = {
        type: this.selectedTool,
        x: this.startX,
        y: this.startY,
        width: width,
        height: height,
      };
    } else if (this.selectedTool === "circle") {
      const radius = Math.max(width, height) / 2;
      shape = {
        type: "circle",
        radius: radius,
        centerX: this.startX + radius,
        centerY: this.startY + radius,
      };
    }

    if (!shape) return;

    this.existingShapes.push(shape);

    this.socket.send(
      JSON.stringify({
        type: "chat",
        message: JSON.stringify({
          shape,
        }),
        roomId: this.roomId,
      })
    );
  };

  mouseMoveHandler = (e: MouseEvent) => {
    console.log("mouse move");

    if (this.clicked) {
      console.log("hello");
      // alert( ' form mouse moveham '+this.context)
      const width = e.clientX - this.startX;
      const height = e.clientY - this.startY;
      this.clearCanvas();

      console.log("from mopuse ", this.context);

      this.context.strokeStyle = "rgba(255,255,255)";
      if (this.selectedTool == "rectangle") {
        this.context?.strokeRect(this.startX, this.startY, width, height);
      } else if (this.selectedTool == "circle") {
        const centerX = this.startX + width / 2;
        const centerY = this.startX + height / 2;
        const radius = Math.max(width, height) / 2;
        this.context.beginPath();
        this.context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        this.context.stroke();
        this.context.closePath();
      }
    }
  };

  clearCanvas() {
    this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = "rgba(0,0,0)";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.existingShapes.map((shape: Shape) => {
      if (shape.type == "rectangle") {
        this.context.strokeStyle = "rgba(255, 255, 255)";
        this.context.strokeRect(shape.x, shape.y, shape.width, shape.height);
      } else if (shape.type == "circle") {
        this.context.beginPath();
        this.context.arc(
          shape.centerX,
          shape.centerY,
          shape.radius,
          0,
          2 * Math.PI
        );
        this.context.stroke();
        this.context.closePath();
      }
    });
  }
}
