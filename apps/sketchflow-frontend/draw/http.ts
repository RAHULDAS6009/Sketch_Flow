import axios from "axios";
import { HTTP_URL } from "../config";

export async function getExsisitingShapes(roomId: string) {
    const res = await axios.get(`${HTTP_URL}/chats/${roomId}`);
    const messages = res.data.chats;
  
    const shapes = messages.map((x: { message: string }) => {
      return JSON.parse(x.message).shape;
    });
  
    return shapes;
  }
  