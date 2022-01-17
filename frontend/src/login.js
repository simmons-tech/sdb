import * as ROUTES from './constants/routes';
import axios from './axiosInstance';

export default async function saveToken(data, history) {
  localStorage.setItem('token', data.access_token);
  localStorage.setItem('refresh_token', data.refresh_token)
  // Get user info after setting the tokens
  try {
    const res = await axios.get('/api/users/get_logged_in/');
    localStorage.setItem('user', JSON.stringify(res.data.user))
    localStorage.setItem('is_admin', res.data.is_admin)
    localStorage.setItem('is_desk_captain', res.data.is_desk_captain)
    localStorage.setItem('is_desk_worker', res.data.is_desk_worker)

    if (history.location.state && history.location.state.goBack) {
      history.goBack();
    } else {
      history.push(ROUTES.HOME)
    }
  } catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    throw error;
  }
}
