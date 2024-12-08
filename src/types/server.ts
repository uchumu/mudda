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
// NOTE: [위도, 경도] 입니다. 원래는 위도 = 수직, 경도 = 수평 값에 가깝기 때문에
// x, y형태라고 하면 [경도, 위도]가 적절해보이나 어쩌다보니 이렇게 되었네요

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
