import { RoomCanvas } from "../../../components/RoomCanvas";

async function CanvasPage({ params }: { params: { roomId: string } }) {
  const roomId = (await params).roomId;
  console.log(roomId);

  return <RoomCanvas roomId={roomId} />;
}

export default CanvasPage;
