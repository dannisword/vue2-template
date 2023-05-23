/**
 * 取得使用者資訊
 * @returns
 */
export function getUserInfo() {
  const data = localStorage.getItem("userInfo");
  return JSON.parse(data);
}
/**
 * 設定使用者資訊
 * @param {*} data
 */
export function setUserInfo(data) {
  const value = JSON.stringify(data);
  localStorage.setItem("userInfo", value);
}
/**
 * 取得 Token
 * @returns
 */
export function getToken() {
  const data = localStorage.getItem("accessToken");
  if (data) {
    const value = JSON.parse(data);
    return value.message.token;
  }
  return null;
}
/**
 * 取得 localStorage
 * @param {*} key
 * @returns
 */
export function getStorageItem(key) {
  const data = localStorage.getItem(key);
  return JSON.parse(data);
}
/**
 * 設定 localStorage
 * @param {*} key
 * @param {*} value
 */
export function setStorageItem(key, value) {
  const data = JSON.stringify(value);
  localStorage.setItem(key, data);
}
/**
 * 清除 localStorage
 */
export function clearLocalStorage() {
  localStorage.clear();
}
