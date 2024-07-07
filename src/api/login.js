import http from '@http/http'

export const loginApi = (obj) => http.POST('./api/login', obj)
