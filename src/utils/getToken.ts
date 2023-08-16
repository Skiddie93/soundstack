import { getCookie } from "cookies-next";

const fetchToken = async () => {
  try {
    const req = await fetch("/api/token", { cache: "no-store" });
    const res = await req.json();

    return res;
  } catch {
    return { error: "failed to fetch token" };
  }
};

export default async () => {
  const cookie = getCookie("credentials");

  if (cookie) return JSON.parse(cookie as string);
  const newToken = await fetchToken();
  console.log("newToken");

  return newToken;
};
