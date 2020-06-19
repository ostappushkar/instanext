import axios, { AxiosRequestConfig } from "axios";
import api_config from "../config/api";
import imgur from "../config/imgur";
enum HttpMethods {
  GET = "get",
  POST = "post",
}

class Http {
  public static request = (url: string, method: HttpMethods, data?: any) => {
    return new Promise<any>((resolve, reject) => {
      const config: AxiosRequestConfig = {
        method: method,
      };
      if (method == HttpMethods.POST) {
        config.headers = {
          Authorization: "Client-ID " + imgur.API_KEY,
        };
        config.data = data;
      }
      let axiosURL: string;
      if (method == HttpMethods.POST) {
        axiosURL = url.includes("//") ? url : imgur.API_URL + url;
      } else {
        axiosURL = url.includes("//") ? url : api_config.API_URL + url;
      }
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
  public static get = (url: string) => Http.request(url, HttpMethods.GET);
  public static post = (url: string, data: any) =>
    Http.request(url, HttpMethods.POST, data);
}
export default Http;
