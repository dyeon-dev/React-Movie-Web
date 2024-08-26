import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types";

export function loginUser(dataToSubmit) {
  const request = axios
    .post("/api/users/login", dataToSubmit)
    .then((res) => res.data);
  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(dataToSubmit) {
  const request = axios.post('/api/users/register', dataToSubmit)
  .then(response => response.data)
  .catch(err => {
    if (err.response) {
      // 서버가 응답을 반환한 경우
      console.error('Error response:', err.response.data);
    } else if (err.request) {
      // 요청이 만들어졌지만 응답을 받지 못한 경우
      console.error('Error request:', err.request);
    } else {
      // 요청을 설정하는 중에 발생한 문제
      console.error('Error message:', err.message);
    }
  });
  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios.get("/api/users/auth").then((res) => res.data);
  return {
    type: AUTH_USER,
    payload: request,
  };
}
