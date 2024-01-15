import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;

  const params = {
    cache: "no-store",
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
  };

  interface Params {
    cache: RequestCache;
    method: string;
    headers: {
      "content-type": string;
    };
    body: string;
  }

  const call = await fetch(
    "https://accounts.spotify.com/api/token",
    params as Params
  );
  const data = await call.json();

  const expiration = new Date().getTime() + 1000 * (data.expires_in - 300);

  cookies().set({
    name: "credentials",
    value: JSON.stringify(data),
    expires: expiration,
    path: "/",
  });

  return NextResponse.json(data);
};
