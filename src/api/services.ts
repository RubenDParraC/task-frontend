// statics
import { API } from "./statics";

// types
import type { AsyncSendApiProps } from "./types";

export const asyncSendApi = async ({
  url,
  method,
  body,
}: AsyncSendApiProps) => {
  let data_send: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    data_send = Object.assign(data_send, { body: body });
  }

  try {
    const response = await fetch(`${API}${url}`, data_send);
    return response;
  } catch (error) {
    console.log(error);
  }
};
