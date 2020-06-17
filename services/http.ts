import axios, { AxiosRequestConfig } from "axios";
import api_config from "../config/api";
enum HttpMethods {
  GET = "get",
  POST = "post",
  DELETE = "delete",
  OPTIONS = "options",
  HEAD = "head",
}

class Http {
  public static request = (url: string, method: HttpMethods, params: any) => {
    return new Promise((resolve, reject) => {
      const config: AxiosRequestConfig = {
        method: method,
      };
      let axiosURL: string = url.includes("//")
        ? url
        : api_config.API_URL + url;
      if (api_config?.API_KEY) {
        config.params = {
          "api-key": api_config?.API_KEY,
        };
      }
      if (
        method === HttpMethods.GET ||
        HttpMethods.HEAD ||
        HttpMethods.OPTIONS
      ) {
        if (typeof params === "object") {
          const keys: Array<string> = Object.keys(params);
          if (keys.length) {
            axiosURL += "?";
            axiosURL += keys
              .map(
                (k) =>
                  `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`
              )
              .join("&");
          }
        }
      } else {
        config.data =
          params instanceof FormData ? params : JSON.stringify(params);
      }
      config.url = axiosURL;
      axios
        .request(config)
        .then((response) => {
          if (method === HttpMethods.HEAD) {
            return resolve(response);
          }
          resolve(response.data);
        })
        .catch((e) => {
          console.warn(e);
          return reject(e);
        });
    });
  };
  public static get = (url: string, params?: any) =>
    Http.request(url, HttpMethods.GET, params);
}
export default Http;
