import http from "@/apis/index.js"
/**
 * 查询 csrf-cookie
 * @returns 
 */
export const getCsrfCookie = () => http.get('/csrf-cookie');