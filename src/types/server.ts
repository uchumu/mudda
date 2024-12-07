/**
 * Message
 */
export interface Message {
  userName: string;
  text: string;
  imageUrl: string;
}

/**
 * Capsule
 */
type Coordinate = [number, number];
interface Map {
  coordinate: Coordinate;
}
interface CapsuleBase {
  capsuleDesignId: number;
  title: string;
  map: Map;
  goalTime: number;
  messageCount: number;
}
interface UndiggedCapsule extends CapsuleBase {
  status: "undigged";
}
interface DiggedCapsule extends CapsuleBase {
  status: "digged";
  createTime: number;
}
interface ClosedCapsule extends CapsuleBase {
  status: "opened";
  message: Message[];
}
export type Capsule = UndiggedCapsule | DiggedCapsule | ClosedCapsule;
