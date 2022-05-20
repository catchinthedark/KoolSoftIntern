const refreshToken = (baseUrl : string) => {
  return new Promise(resolve => {
    setTimeout(async() => {
      await fetch(`${baseUrl}/auth/refresh-token`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        credentials: 'include'
      });
      resolve("refresh token");
    }, 3000);
  });
}

let refreshTokenRequest : any = null

const fetchInterceptors = async (args: { method?: string; url: string; baseUrl: string; body?: any }): Promise<{
    success: boolean;
    data: any
  }> => {
    const { method = 'GET', url, baseUrl, body } = args;
    const config: RequestInit = { method, headers: { "Content-Type": "application/json" }, credentials: 'include' };
    if (method !== 'GET' && body) Object.assign(config, { body: JSON.stringify(body) });
  
    const response = await fetch(`${baseUrl}${url}`, config);
    const status = response.status;
    const rspBody = await response.json();
    if (status === 401 && rspBody?.data === -1) {
      console.log("refresh token...")
      refreshTokenRequest = refreshTokenRequest ? refreshTokenRequest : refreshToken(baseUrl)
      const newResp = await fetch(`${baseUrl}${url}`, config);
      const newRspBody = await newResp.json();
      refreshTokenRequest = null
      return newRspBody;
    }
  return rspBody;
}
  
export default fetchInterceptors;