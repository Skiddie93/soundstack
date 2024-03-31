import getToken from "./getToken";

const queryData = async (
  url: string
): Promise<Record<string, any> | undefined> => {
  let token = await getToken();
  //let token = { access_token: "123" };
  if (!token)
    return {
      error: { message: "could not authenticat request" },
    };

  const req: any = await fetch(url, {
    headers: {
      Authorization: "Bearer " + token.access_token,
    },
  });

  const data = await req.json();

  return data;
};

export default queryData;
