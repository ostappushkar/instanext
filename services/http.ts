import axios, { AxiosRequestConfig } from "axios";
import api_config from "../config/api";
enum HttpMethods {
  GET = "get",
}

class Http {
  public static request = (url: string, method: HttpMethods) => {
    return new Promise((resolve, reject) => {
      const config: AxiosRequestConfig = {
        method: method,
      };
      let axiosURL: string = url.includes("//")
        ? url
        : api_config.API_URL + url;
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
}
export default Http;
