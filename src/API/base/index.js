import axios from "axios";
import { Service } from "axios-middleware";

const base = "https://api-diappbetes.vercel.app/api/"; //Server Prod.

const localStorage = window.localStorage;

class Register {
  constructor(http) {
    this.http = http;
    if (typeof Register.instance === "object") return Register.instance;
    Register.instance = this;
  }

  onRequest(config) {
    return config;
  }

  onSync(promise) {
    return promise;
  }
  
  onResponse(data) {
    return data;
  }

  onResponseError(err = {}) {
    return err.response;
  }
}

class Request {
  constructor(url, headers = {}) {
    this.url = url;
    this.request = axios.create({
      baseURL: base,
      headers: headers,
    });

    this.request.interceptors.request.use(function (config) {
      var token = localStorage.getItem("token");
      if (token != null) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      console.log("config", config);
      return config;
    });

    this.request.interceptors.response.use(
      async (response) => {
        if (response.config && response.status === 401) {
          console.log("petición que falló por token: ", response);
        }
        return Promise.resolve(response);
      },
      (error) => {
        if (error.config && error.status === 401) {
          console.log("petición que falló por token: ", error);
        }
        return Promise.reject(error);
      }
    );

    const service = new Service(this.request);
    service.register(new Register());
  }

  get(params = {}) {
    return this.request({ url: this.url, method: "GET", params: params });
  }

  post(postData) {
    return this.request({ url: this.url, method: "POST", data: postData });
  }

  update(updateData) {
    return this.request({ url: this.url, method: "PATCH", data: updateData });
  }

  updatePut(updateData) {
    return this.request({ url: this.url, method: "PUT", data: updateData });
  }

  delete() {
    return this.request({ url: this.url, method: "DELETE" });
  }
}

export default Request;
