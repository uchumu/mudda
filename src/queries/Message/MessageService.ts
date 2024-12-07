import { responseType } from "@/types/server";
import Service from "../Service";

class MessageService extends Service {
  postMessage = (formData: FormData) =>
    this.http.post<responseType<string>>(``, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
}

export default new MessageService();
