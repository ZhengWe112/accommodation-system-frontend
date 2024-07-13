import http from '@http/http'

export const getAccommodationLogLst = (obj) => http.GET('/api/accommodationLog/list', obj)

// 查询所有未被排宿的学生
export const getUnbookedStudent = () => http.GET('/api/student/list/unbooked')

// 批量排宿
export const batchStudent = (obj) => http.POST('/api/student/batch', obj)

export const unBatchStudent = (obj) => http.POST('/api/student/unBatch', obj)
