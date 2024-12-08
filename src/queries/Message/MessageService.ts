import { backendUrl } from "@/constants/environments";
import Service from "../Service";

class MessageService extends Service {
  postMessage = (formData: FormData) =>
    fetch(backendUrl + "/api/capsule/message", {
      method: "POST",
      body: formData,
    });
}

export default new MessageService();
