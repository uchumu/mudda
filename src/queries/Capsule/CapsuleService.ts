import { Capsule, ResponseType } from "@/types/server";
import getQueryString from "@/utils/getQueryString";
import Service from "../Service";

class CapsuleService extends Service {
  getCapsule = ({ code }: { code: string }) =>
    this.http.get<ResponseType<Capsule>>(
      `/capsule?${getQueryString({ code })}`
    );
  postCapsule = (body: {
    title: string;
    map: { x: number; y: number };
    goalTime: number;
    capsuleDesignId: number;
    password: string;
  }) => this.http.post<ResponseType<string>>(`/capsule`, body);
  putCapsuleDig = (body: { code: string; password: string }) =>
    this.http.put<ResponseType<string>>(`capsule`, body);
}

export default new CapsuleService();
