import http from '@http/http'

// 查询某位宿管创建的违规记录
export const getViolationByDorm = (obj) => http.GET('/api/violationRecord/byDormAdmin', obj)

// 查询分管领导可以看见的违规记录 即state >= 1
export const getViolationByState = (obj) => http.GET('/api/violationRecord/byState', obj)

// 添加违规记录
export const addViolationRecord = (obj) => http.POST('/api/violationRecord/add', obj)

// 删除违规记录
export const delViolationRecord = (id) => http.DELETE('/api/violationRecord/' + id)

// 送审违规记录
export const submitViolationRecord = (obj) => http.GET('/api/violationRecord/submit', obj)

// 发送警告通知
export const sendWarningMsg = (obj) => http.GET('/api/violationRecord/send', obj)

// 获取警告通知 根据学生的id
export const getWarningMsg = (obj) => http.GET('/api/violationWarning/list', obj)
