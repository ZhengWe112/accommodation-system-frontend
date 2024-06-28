import http from '@http/http'
// 获取当前用户
export const _getUserInfo = (errMsg) => http.GET('./api/auth/userInfo', {}, errMsg)
