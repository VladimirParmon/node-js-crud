import { IncomingMessage } from "http";

export function getBodyData(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      let body: string = "";

      req.on("data", (chunk: Buffer) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
}
