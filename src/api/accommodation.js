import http from '@http/http'

// 获取所有住宿日志
export const getAccommodationLog = (pageNo, pageSize) => http.GET('./api/accommodationLog/list?pageNo=' + pageNo + '&pageSize=' + pageSize, {})
