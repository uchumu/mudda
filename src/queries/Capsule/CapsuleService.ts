import { Capsule, responseType } from "@/types/server";
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
  }) => this.http.post<responseType<string>>(`/capsule`, body);
}

export default new CapsuleService();
