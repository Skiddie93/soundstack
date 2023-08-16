import getToken from "./getToken";

const queryData = async (url:string ):Promise<Record<any,any> | undefined > => {

    let token = await getToken()
    
    
    if (!token) return 
      
    const req = await fetch(
      url,
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