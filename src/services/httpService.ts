import axios from "axios";

const httpService = axios.create({
  baseURL: "https://localhost:7299",
});

export const http_GET = async (url: string) => {
  const res = await httpService.get(url);
  return res.data;
};
export const http_POST = async (url: string, payload: any) => {
  console.log(payload);
  const res = await httpService.post(url, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};
export const http_DELETE = async (url: string, id: number) => {
  const res = await httpService.delete(url);
  return res.data;
};
export const http_PUT = async (url: string, payload: any) => {
  const res = await httpService.put(url);
  return res.data;
};
