import axios from "axios";
import { history } from "./routing.js";
import * as ROUTES from "./constants/routes";

// const baseURL = 'http://localhost:8000'

const isHandlerEnabled = (config = {}) => {
  return config.hasOwnProperty("handlerEnabled") && !config.handlerEnabled
    ? false
    : true;
};

const getNewJwtToken = (instance) => {
  return new Promise((resolve, reject) => {
    instance
      .post("/refresh_token/", {
        refresh: localStorage.getItem("refresh_token"),
      })
      .then((response) => {
        resolve(response.data.access);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getNewOidcToken = (instance) => {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", localStorage.getItem("refresh_token"));
    params.append("redirect_uri", process.env.REACT_APP_OPENID_REDIRECT);
    instance
      .post("https://oidc.mit.edu/token", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: process.env.REACT_APP_OPENID_ID,
          password: process.env.REACT_APP_OPENID_SECRET,
        },
      })
      .then((response) => {
        console.log(response);
        resolve(response.data.access);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const errorHandler = (instance, error) => {
  if (isHandlerEnabled(error.config)) {
    let statusCode = error.response.status;
    if (statusCode === 401) {
      // if (error.config.url === baseURL + "/refresh_token/") {
      if (error.config.url === "/refresh_token/") {
        // Refresh failed; log out
        localStorage.clear();
        history.replace(ROUTES.LOGIN);
        return Promise.reject({ ...error });
      }

      if (
        error.response.data.code === "token_not_valid" ||
        error.response.data.detail?.startsWith("Invalid access token")
      ) {
        // Try request again with new token
        return (
          localStorage.getItem("used_oidc") === "true"
            ? getNewOidcToken(instance)
            : getNewJwtToken(instance)
        )
          .then((token) => {
            // Save new token to storage
            localStorage.setItem("token", token);

            const tokenPrefix =
              localStorage.getItem("used_oidc") === "true" ? "Bearer" : "JWT";

            // Modify original instance given to user
            instance.interceptors.request.use(function (config) {
              config.headers.Authorization = `${tokenPrefix} ${token}`;
              return config;
            });

            // New request with new token
            const config = error.config;
            config.headers["Authorization"] = `${tokenPrefix} ${token}`;

            return new Promise((resolve, reject) => {
              axios
                .request(config)
                .then((response) => {
                  resolve(response);
                })
                .catch((error) => {
                  reject(error);
                });
            });
          })
          .catch((error) => {
            window.location.replace(ROUTES.SIGN_OUT);
            Promise.reject(error);
          });
      }
    }
  }
  return Promise.reject({ ...error });
};

const successHandler = (response) => {
  if (isHandlerEnabled(response.config)) {
    // Handle responses
  }
  return response;
};

const fetchClient = () => {
  const defaultOptions = {
    // baseURL: baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    const tokenPrefix =
      localStorage.getItem("used_oidc") === "true" ? "Bearer" : "JWT";
    config.headers.Authorization = token ? `${tokenPrefix} ${token}` : "";
    return config;
  });

  instance.interceptors.response.use(
    (response) => successHandler(response),
    (error) => errorHandler(instance, error)
  );

  return instance;
};

export default fetchClient();
