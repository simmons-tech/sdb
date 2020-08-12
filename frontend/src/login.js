import * as ROUTES from './constants/routes';

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

export default function saveToken(data, history) {
  let payload = parseJwt(data.access)
  console.log(payload)
  localStorage.setItem('token', data.access);
  localStorage.setItem('refresh_token', data.refresh)
  localStorage.setItem('user', JSON.stringify(payload.user))
  localStorage.setItem('is_admin', payload.is_admin)
  localStorage.setItem('is_desk_worker', payload.is_desk_worker)
  if (history.location.state && history.location.state.goBack) {
    history.goBack();
  } else {
    history.push(ROUTES.HOME)
  }
}