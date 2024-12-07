import { Capsule } from "@/types/server";
import getQueryString from "@/utils/getQueryString";
import Service from "../Service";

class CapsuleService extends Service {
  getCapsule = ({ code }: { code: string }) =>
    this.http.get<Capsule>(`/capsule?${getQueryString({ code })}`);
  postCapsule = (body: {
    title: string;
    map: { x: number; y: number };
    goalTime: number;
    capsuleDesignId: number;
    password: string;
  }) =>
    this.http.post<{
      success: boolean;
      code: number;
      message: string;
      data: string;
    }>(`/capsule`, body);
}

export default new CapsuleService();
