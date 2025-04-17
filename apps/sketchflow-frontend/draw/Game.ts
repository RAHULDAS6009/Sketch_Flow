import { Shape } from "./index";
import { Tool } from "../components/Canvas";
import { getExsisitingShapes } from "./http";

export class Game {
  private roomId: string;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private startX: number = 0;
  private startY: number = 0;
  private pencilPositions: { x: number; y: number }[] = [];
  private diamondPositions: { x: number; y: number }[] = [];
  private selectedTool: Tool = "circle";
  private clicked: boolean;
  private existingShapes: Shape[];
  private socket: WebSocket;

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
    console.log(this.selectedTool);

    this.clicked = true;
    this.startX = e.clientX;
    this.startY = e.clientY;

    if (this.selectedTool === "pencil") {
      this.pencilPositions = [];
      this.pencilPositions.push({ x: e.clientX, y: e.clientY });
    }
  };

  mouseUpHandler = (e: MouseEvent) => {
    this.clicked = false;
    const width = Math.abs(e.clientX - this.startX);
    const height = Math.abs(e.clientY - this.startY);
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
        centerX: this.startX + radius,
        centerY: this.startY + radius,
        radiusX: width,
        radiusY: height,
      };
    } else if (this.selectedTool === "pencil") {
      shape = {
        type: "pencil",
        positions: this.pencilPositions,
      };
    } else if (this.selectedTool === "diamond") {
      shape = {
        type: "diamond",
        positions: this.diamondPositions,
      };
    } else if (this.selectedTool == "line") {
      shape = {
        type: "line",
        startX: this.startX,
        startY: this.startY,
        endX: e.clientX,
        endY: e.clientY,
      };
    } else if (this.selectedTool == "arrow") {
      shape = {
        type: "arrow",
        startX: this.startX,
        startY: this.startY,
        endX: e.clientX,
        endY: e.clientY,
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

  canavas_arrow(
    startx: number,
    starty: number,
    endx: number,
    endy: number,
    len: number
  ) {
    const headlen = len;

    var dx = endx - startx;
    var dy = endy - starty;

    var angle = Math.atan2(dy, dx);

    this.context.moveTo(startx, starty);
    this.context.lineTo(endx, endy);

    this.context.moveTo(endx, endy);
    this.context.lineTo(
      endx - headlen * Math.cos(angle - Math.PI / 6),
      endy - headlen * Math.sin(angle - Math.PI / 6)
    ); //-30 degree

    this.context.moveTo(endx, endy);
    this.context.lineTo(
      endx - headlen * Math.cos(angle + Math.PI / 6),
      endy - headlen * Math.sin(angle + Math.PI / 6)
    ); //+30 degree
  }

  mouseMoveHandler = (e: MouseEvent) => {
    if (this.clicked) {
      const width = Math.abs(e.clientX - this.startX);
      const height = Math.abs(e.clientY - this.startY);

      this.context.strokeStyle = "rgba(255,255,255)";
      if (this.selectedTool == "rectangle") {
        this.clearCanvas();
        this.context?.strokeRect(this.startX, this.startY, width, height);
      } else if (this.selectedTool == "circle") {
        this.clearCanvas();
        const centerX = this.startX + width / 2;
        const centerY = this.startX + height / 2;
        // const radius = Math.max(width, height) / 2;
        this.context.beginPath();
        this.context.ellipse(
          centerX,
          centerY,
          width,
          height,
          0,
          0,
          2 * Math.PI
        );
        this.context.stroke();
        this.context.closePath();
      } else if (this.selectedTool === "pencil") {
        this.context.beginPath();
        this.context.moveTo(this.startX, this.startY);
        this.context.lineTo(e.offsetX, e.offsetY);
        this.context.stroke();
        this.context.closePath();

        //save the pencil paths
        this.pencilPositions.push({ x: e.offsetX, y: e.offsetY });

        this.startX = e.offsetX;
        this.startY = e.offsetY;
      } else if (this.selectedTool === "diamond") {
        this.clearCanvas();
        this.context.beginPath();
        this.diamondPositions = [];

        this.context.moveTo(this.startX + width / 2, this.startY);
        this.diamondPositions.push({
          x: this.startX + width / 2,
          y: this.startY,
        });

        this.context.lineTo(this.startX + width, this.startY + height / 2);
        this.diamondPositions.push({
          x: this.startX + width,
          y: this.startY + height / 2,
        });

        this.context.lineTo(this.startX + width / 2, this.startY + height);
        this.diamondPositions.push({
          x: this.startX + width / 2,
          y: this.startY + height,
        });

        this.context.lineTo(this.startX, this.startY + height / 2);
        this.diamondPositions.push({
          x: this.startX,
          y: this.startY + height / 2,
        });

        this.context.lineTo(this.startX + width / 2, this.startY);
        this.diamondPositions.push({
          x: this.startX + width / 2,
          y: this.startY,
        });

        this.context.stroke();
        this.context.closePath();
      } else if (this.selectedTool == "line") {
        this.clearCanvas();
        this.context.beginPath();
        this.context.moveTo(this.startX, this.startY);
        this.context.lineTo(e.clientX, e.clientY);
        this.context.stroke();
        this.context.closePath();
      } else if (this.selectedTool == "arrow") {
        this.clearCanvas();
        this.context.beginPath();
        this.canavas_arrow(this.startX, this.startY, e.clientX, e.clientY, 20);
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
        this.context.ellipse(
          shape.centerX,
          shape.centerY,
          shape.radiusX,
          shape.centerY,
          0,
          0,
          2 * Math.PI
        );
        this.context.stroke();
        this.context.closePath();
      } else if (shape.type == "pencil") {
        this.context.beginPath();

        for (let i = 0; i < shape.positions.length - 1; i++) {
          this.context.moveTo(shape.positions[i]!.x, shape.positions[i]!.y);
          this.context.lineTo(
            shape.positions[i + 1]!.x,
            shape.positions[i + 1]!.y
          );
        }

        this.context.stroke();
        this.context.closePath();
      } else if (shape.type == "diamond") {
        this.context.beginPath();

        this.context.moveTo(shape.positions[0]!.x, shape.positions[0]!.y);
        this.context.lineTo(shape.positions[1]!.x, shape.positions[1]!.y);
        this.context.lineTo(shape.positions[2]!.x, shape.positions[2]!.y);
        this.context.lineTo(shape.positions[3]!.x, shape.positions[3]!.y);
        this.context.lineTo(shape.positions[4]!.x, shape.positions[4]!.y);

        this.context.stroke();
        this.context.closePath();
      } else if (shape.type == "line") {
        this.context.beginPath();
        this.context.moveTo(shape.startX, shape.startY);
        this.context.lineTo(shape.endX, shape.endY);
        this.context.stroke();
        this.context.closePath();
      } else if (shape.type == "arrow") {
        this.context.beginPath();
        this.canavas_arrow(shape.startX, shape.startY, shape.endX, shape.endY,20);
        this.context.stroke();
        this.context.closePath();
      }
    });
  }
}
