import * as jwtDecode from "jwt-decode";

const TOKEN_AUTHOR = "accessToken";
const USER_LOGIN = "userLogin";
const CART = "cart";

const getDataTextStorage = (storeName) => {
  if (localStorage.getItem(storeName)) {
    return localStorage.getItem(storeName);
  }
  return null;
};

const getDataJsonStorage = (storeName) => {
  if (localStorage.getItem(storeName)) {
    return JSON.parse(localStorage.getItem(storeName));
  }
  return null;
};

const setDataTextStorage = (storeName, data) => {
  localStorage.setItem(storeName, data);
};

const setDataJsonStorage = (storeName, data) => {
  localStorage.setItem(storeName, JSON.stringify(data));
};

const removeDataTextStorage = (storeName) => {
  localStorage.removeItem(storeName);
};

const removeDataJsonStorage = (storeName) => {
  localStorage.setItem(storeName);
};

// Các hàm để thao tác với cookie
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function delCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

const convertDateAndTime = (dateTimeString) => {
  const dateTime = new Date(dateTimeString);

  // Extract date components
  const year = dateTime.getFullYear();
  const month = ("0" + (dateTime.getMonth() + 1)).slice(-2); // Months are zero-indexed
  const day = ("0" + dateTime.getDate()).slice(-2);

  // Extract time components
  const hours = ("0" + dateTime.getHours()).slice(-2);
  const minutes = ("0" + dateTime.getMinutes()).slice(-2);
  const seconds = ("0" + dateTime.getSeconds()).slice(-2);

  // Formatted date and time
  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return `${formattedDate} ${formattedTime}`;
};

function isTokenExpired(token) {
  try {
    const decodedToken = jwtDecode.jwtDecode(token);
    const expirationTime = new Date(decodedToken.exp * 1000);
    const currentTime = new Date();
    return expirationTime < currentTime;
  } catch (error) {
    return true;
  }
}

export {
  setCookie,
  getCookie,
  delCookie,
  getDataTextStorage,
  getDataJsonStorage,
  setDataTextStorage,
  setDataJsonStorage,
  removeDataTextStorage,
  removeDataJsonStorage,
  TOKEN_AUTHOR,
  USER_LOGIN,
  CART,
  convertDateAndTime,
  isTokenExpired,
};
