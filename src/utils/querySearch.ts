import getToken from "./getToken";

const queryData = async (term:string ):Promise<Record<any,any> | undefined > => {

    let token = await getToken()
    
    
    if (!token) return 
      
    const queryString = encodeURIComponent(term);

  
    const req = await fetch(
      `https://api.spotify.com/v1/search?q=${queryString}&type=album`,
      {
        headers: {
          Authorization: "Bearer " + token.access_token,
        },
      }
    );
  
    const data = await req.json();
  

    return data;
  };

  export default queryData