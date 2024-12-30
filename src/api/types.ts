export type AsyncSendApiProps = {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: string;
};
