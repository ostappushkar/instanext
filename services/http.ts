import axios, { AxiosRequestConfig } from "axios";
import imgur from "../config/imgur";
enum HttpMethods {
  POST = "post",
}

class Http {
  public static request = (url: string, method: HttpMethods, data?: any) => {
    return new Promise<any>((resolve, reject) => {
      const config: AxiosRequestConfig = {
        method: method,
        headers: {
          Authorization: "Client-ID " + imgur.API_KEY,
        },
        data: data,
      };

      let axiosURL: string;
      axiosURL = url.includes("//") ? url : imgur.API_URL + url;
      config.url = axiosURL;
      axios
        .request(config)
        .then((response) => {
          resolve(response.data);
        })
        .catch((e) => {
          console.warn(e);
          return reject(e);
        });
    });
  };
  public static post = (url: string, data: any) =>
    Http.request(url, HttpMethods.POST, data);
}
export default Http;
