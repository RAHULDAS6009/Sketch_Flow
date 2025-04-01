import { Shape } from ".";
import { Tool } from "../components/Canvas";
import { getExsisitingShapes } from "./http";

export class Game {
  private roomId: string;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private startX: number = 0;
  private startY: number = 0;
  private selectedTool: Tool="circle";
  private clicked: boolean = false;
  private exsistingShapes: Shape[];
  
  socket: WebSocket;

  constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d")!; //assume it is not null
    this.exsistingShapes = [];
    this.roomId = roomId;
    this.socket = socket;
    this.init();
    this.initHandlers();
    this.initMouseHandlers();
  }

  destroy() {
    this.canvas.removeEventListener("mousedown", this.mouseDownHandler);

    this.canvas.removeEventListener("mouseup", this.mouseUpHandler);

    this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
  }

  setSelectedTool(tool: Tool) {
    this.selectedTool = tool;
  }

  async init() {
    this.exsistingShapes = await getExsisitingShapes(this.roomId);
    console.log(this.exsistingShapes)
    this.clearCanvas();
  }

  initHandlers() {
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type == "chat") {
        const parsedShape = JSON.parse(message.message);
        this.exsistingShapes.push(parsedShape.shape);
        this.clearCanvas();
      }
    };
  }

  mouseDownHandler(e: MouseEvent) {
    this.clicked = true;

    this.startX = e.clientX;
    this.startY = e.clientY;
  }

  mouseUpHandler(e: MouseEvent) {
    console.log(this.clicked)

    this.clicked = false;
    const width = e.clientX - this.startX;
    const height = e.clientY - this.startY;
    const radius = Math.max(width, height) / 2;
    let shape: Shape;


    if (this.selectedTool === "rectangle") {
      shape = {
        type: this.selectedTool,
        x: this.startX,
        y: this.startY,
        width: width,
        height: height,
      };
      this.exsistingShapes.push(shape);
      this.socket.send(
        JSON.stringify({
          type: "chat",
          message: JSON.stringify({
            shape,
          }),
          roomId: this.roomId,
        })
      );
    } else if (this.selectedTool === "circle") {
      shape = {
        type: "circle",
        centerX: this.startX + radius,
        centerY: this.startY + radius,
        radius: radius,
      };
      this.exsistingShapes.push(shape);
      this.socket.send(
        JSON.stringify({
          type: "chat",
          message: JSON.stringify({
            shape,
          }),
          roomId: this.roomId,
        })
      );
    } else {
    }
  }

  mouseMoveHandler(e: MouseEvent) {
    if (this.clicked) {
      console.log("hello")
      // alert( ' form mouse moveham '+this.context)
      const width = e.clientX - this.startX;
      const height = e.clientY - this.startY;
      // this.clearCanvas();

console.log("from mopuse ",this.context)

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
      }
    }
  }

  initMouseHandlers() {
    this.canvas.addEventListener("mousedown", this.mouseDownHandler);

    this.canvas.addEventListener("mouseup", this.mouseUpHandler);

    this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
  }

  clearCanvas() {
    this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = "rgba(0,0,0)";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.strokeStyle = "rgba(255, 255, 255)";

    this.exsistingShapes.map((shape: Shape) => {
      if (shape.type == "rectangle") {
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
        //{ this.context.closePath()}
      }
    });
  }
}
