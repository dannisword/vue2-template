import request from "@/utils/request";
/**
 * 登入
 * @param {*} data 
 * @returns 
 */
export function login(data) {
  return request({
    url: `/api/auth/login`,
    method: "POST",
    data: data,
  });
}
