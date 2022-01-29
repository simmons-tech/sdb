import * as ROUTES from "./constants/routes";
import axios from "./axiosInstance";

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}

const localStorageFields = [
  "token",
  "refresh_token",
  "used_oidc",
  "user",
  "is_admin",
  "is_desk_captain",
  "is_desk_worker",
]

export function saveJwtToken(data, history, impersonate=false) {
  if (impersonate) {
    localStorageFields.forEach((field) => {
      localStorage.setItem(`impersonate_${field}`, localStorage.getItem(field));
    })
    localStorage.setItem("impersonating", "true");
  }

  let payload = parseJwt(data.access);
  localStorage.setItem("token", data.access);
  localStorage.setItem("refresh_token", data.refresh);
  localStorage.setItem("used_oidc", "false");
  localStorage.setItem("user", JSON.stringify(payload.user));
  localStorage.setItem("is_admin", payload.is_admin);
  localStorage.setItem("is_desk_captain", payload.is_desk_captain);
  localStorage.setItem("is_desk_worker", payload.is_desk_worker);
  if (history.location.state && history.location.state.goBack) {
    history.goBack();
  } else {
    history.push(ROUTES.HOME);
  }
}

export function stopImpersonating() {
  localStorageFields.forEach((field) => {
    localStorage.setItem(field, localStorage.getItem(`impersonate_${field}`));
    localStorage.removeItem(`impersonate_${field}`);
  })
  localStorage.removeItem("impersonating");
}

export async function saveOidcToken(data, history) {
  localStorage.setItem("token", data.access_token);
  localStorage.setItem("refresh_token", data.refresh_token);
  localStorage.setItem("used_oidc", "true");
  // Get user info after setting the tokens
  try {
    const res = await axios.get("/api/users/get_logged_in/");
    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("is_admin", res.data.is_admin);
    localStorage.setItem("is_desk_captain", res.data.is_desk_captain);
    localStorage.setItem("is_desk_worker", res.data.is_desk_worker);

    if (history.location.state && history.location.state.goBack) {
      history.goBack();
    } else {
      history.push(ROUTES.HOME);
    }
  } catch (error) {
    localStorage.clear();
    throw error;
  }
}
